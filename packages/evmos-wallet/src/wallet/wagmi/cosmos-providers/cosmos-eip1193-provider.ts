// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { isUndefined, raise } from "helpers";
import {
  EIP1193EventMap,
  EIP1193Provider,
  EIP1474Methods,
  createPublicClient,
  hexToSignature,
  http,
  toHex,
} from "viem";
import { ChainInfo, EthSignType } from "@keplr-wallet/types";
import { fromHex, isHex, parseAccount, serializeTransaction } from "viem/utils";
import { get, omit, uniqueId } from "lodash-es";
import { estimateFeesPerGas, estimateGas } from "viem/actions";
import { normalizeChainId } from "wagmi";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { EventEmitter } from "events";
import { EVMOS_CONFIG_MAP } from "helpers/src/evmos-info";
import { OfflineSigner } from "@cosmjs/proto-signing";

type ByMethod<M extends string> = Extract<
  EIP1474Methods[number],
  { Method: M }
>;
type EIP1474ReturnType<M extends string> = ByMethod<M>["ReturnType"];
type EIP1474Parameters<M extends string> = ByMethod<M>["Parameters"];

type ChainConfig =
  | ChainInfo
  | {
      // this means the chain doesn't need to be suggested to keplr
      isNative: true;
      chainId: string;
    };

type PublicCosmoProvider = {
  enable: (chainId: string) => Promise<void>;
  experimentalSuggestChain: (chainInfo: {}) => Promise<void>;
  signEthereum: (
    chainId: string,
    signer: string,
    data: string | Uint8Array,
    type: EthSignType,
  ) => Promise<Uint8Array>;
  getOfflineSigner: (chainId: string) => OfflineSigner;
};
export class CosmosEIP1193Provider implements EIP1193Provider {
  ee = new EventEmitter({});
  private connectedNetwork: number | null;

  getCosmosProvider: () => Promise<PublicCosmoProvider>;
  constructor(
    public name: string,
    public chainConfigMap: {
      DEFAULT: number;
      [evmId: number]: ChainConfig | (() => Promise<ChainConfig>);
    },

    getCosmosProvider: () => Promise<PublicCosmoProvider>,
  ) {
    this.getCosmosProvider = getCosmosProvider.bind(this);
    this.connectedNetwork = this.chainConfigMap.DEFAULT;
    if (typeof window === "undefined") return;
    void this.setup();
  }
  private isReady = false;
  resolveCosmosConfig = async (evmChainId: string | number) => {
    const chainConfig = this.chainConfigMap[normalizeChainId(evmChainId)];
    if (!chainConfig) {
      throw new Error("Chain not supported");
    }
    return typeof chainConfig === "function"
      ? await chainConfig()
      : chainConfig;
  };

  getCosmosId = async () => {
    const chainId = await this.request({ method: "eth_chainId" });
    const chainConfig = await this.resolveCosmosConfig(
      normalizeChainId(chainId),
    );
    return chainConfig.chainId;
  };

  setIsAuthorized = (isAuthorized: boolean) => {
    window.localStorage.setItem(
      `${this.name}.ProviderStatus`,
      isAuthorized ? "authorized" : "unauthorized",
    );
  };
  getIsAuthorized = () => {
    return (
      window.localStorage.getItem(`${this.name}.ProviderStatus`) ===
      "authorized"
    );
  };

  on<TEvent extends keyof EIP1193EventMap>(
    event: TEvent,
    listener: EIP1193EventMap[TEvent],
  ): void {
    this.ee.addListener(event, listener);
  }
  removeListener<TEvent extends keyof EIP1193EventMap>(
    event: TEvent,
    listener: EIP1193EventMap[TEvent],
  ): void {
    this.ee.removeListener(event, listener);
  }
  request: EIP1193Provider["request"] = (args) => {
    const fn: unknown = get(this, args.method);

    if (typeof fn !== "function") {
      throw Error("Method not implemented.");
    }

    return fn(args.params) as never;
  };

  eth_chainId = () => {
    if (!this.isReady || !this.connectedNetwork) {
      throw new Error("Not connected");
    }
    return toHex(this.connectedNetwork);
  };

  eth_requestAccounts = async () => {
    const provider = await this.getCosmosProvider();

    const signer = provider.getOfflineSigner(await this.getCosmosId());
    const [account = raise("Account not found")] = await signer.getAccounts();
    return [normalizeToEth(account.address)] as const;
  };

  personal_sign = async (
    parameters: [string],
    signType: EthSignType,
  ): Promise<EIP1474ReturnType<"personal_sign">> => {
    const cosmosId = await this.getCosmosId();

    const [account] = await this.eth_requestAccounts();
    const cosmosProvider = await this.getCosmosProvider();
    const signature = await cosmosProvider.signEthereum(
      cosmosId,
      normalizeToCosmos(account),
      parameters[0],
      signType,
    );

    return toHex(signature);
  };
  getPublicClient = async () => {
    const chainId = normalizeChainId(
      await this.request({ method: "eth_chainId" }),
    );
    const chain =
      Object.values(EVMOS_CONFIG_MAP).find((chain) => chain.id === chainId) ??
      raise("Chain not found");
    return createPublicClient({
      chain,
      transport: http(),
    });
  };
  prepareTransactionForProvider = async (
    request: EIP1474Parameters<"eth_sendTransaction">[0],
  ) => {
    const chainId = normalizeChainId(
      await this.request({ method: "eth_chainId" }),
    );

    const client = await this.getPublicClient();
    const account = parseAccount(request.from);

    const nonce =
      request.nonce ??
      (await client.getTransactionCount({
        address: account.address,
        blockTag: "pending",
      }));

    const transaction = {
      from: request.from,
      data: request.data,
      to: request.to ?? undefined,
      value: request.value,
      nonce: isHex(nonce) ? fromHex(nonce, "number") : nonce,
      chainId,
    };

    let maxFeePerGas = isHex(request.maxFeePerGas)
      ? fromHex(request.maxFeePerGas, "bigint")
      : undefined;
    let maxPriorityFeePerGas = isHex(request.maxPriorityFeePerGas)
      ? fromHex(request.maxPriorityFeePerGas, "bigint")
      : undefined;
    if (isUndefined(maxFeePerGas) || isUndefined(maxPriorityFeePerGas)) {
      const estimate = await estimateFeesPerGas(client);
      maxFeePerGas = estimate.maxFeePerGas;
      maxPriorityFeePerGas = estimate.maxPriorityFeePerGas;
    }

    const eip1559Request = omit(request, "gasPrice");
    const gas =
      request.gas ??
      (await estimateGas(client, {
        type: "eip1559",
        account: { address: account.address, type: "json-rpc" },
        data: request.data,
        to: request.to,
        value: isHex(request.value)
          ? fromHex(request.value, "bigint")
          : undefined,

        nonce: isHex(request.nonce)
          ? fromHex(request.nonce, "number")
          : undefined,

        accessList: request.accessList,
        maxFeePerGas,
        maxPriorityFeePerGas,
        gas: isHex(eip1559Request.gas)
          ? fromHex(eip1559Request.gas, "bigint")
          : undefined,
      }));

    return {
      ...transaction,
      type: 2,
      gasLimit: isHex(gas) ? gas : toHex(gas),
      maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
      maxFeePerGas: toHex(maxFeePerGas),
    };
  };
  eth_sendTransaction = async ([
    request,
  ]: EIP1474Parameters<"eth_sendTransaction">): Promise<
    EIP1474ReturnType<"eth_sendTransaction">
  > => {
    const transaction = await this.prepareTransactionForProvider(request);
    const signature = await this.personal_sign(
      [JSON.stringify(transaction)],
      EthSignType.TRANSACTION,
    );

    const message = serializeTransaction(
      {
        value: isHex(transaction.value)
          ? fromHex(transaction.value, "bigint")
          : undefined,
        nonce: transaction.nonce,
        to: transaction.to,

        chainId: transaction.chainId,
        data: transaction.data,
        type: "eip1559",

        gas: fromHex(transaction.gasLimit, "bigint"),

        maxFeePerGas: fromHex(transaction.maxFeePerGas, "bigint"),
        maxPriorityFeePerGas: fromHex(
          transaction.maxPriorityFeePerGas,
          "bigint",
        ),
      },
      hexToSignature(signature),
    );
    const client = await this.getPublicClient();

    return client.request({
      method: "eth_sendRawTransaction",
      params: [message],
    });
  };
  eth_signTypedData_v4 = async (
    parameters: EIP1474Parameters<"eth_signTypedData_v4">,
  ): Promise<EIP1474ReturnType<"eth_signTypedData_v4">> => {
    const cosmosProvider = await this.getCosmosProvider();
    const cosmosId = await this.getCosmosId();
    const [account, message] = parameters;
    const signature = await cosmosProvider.signEthereum(
      cosmosId,
      normalizeToCosmos(account),
      message,
      EthSignType.EIP712,
    );

    return toHex(signature);
  };

  wallet_requestPermissions = async (
    request: EIP1474Parameters<"wallet_requestPermissions">,
  ): Promise<EIP1474ReturnType<"wallet_requestPermissions">> => {
    const response = await Promise.all(
      request.map(async ({}) => ({
        id: uniqueId(this.name),
        parentCapability: "eth_accounts",

        invoker: "https://" as const,

        caveats: [
          {
            type: "restrictReturnedAccounts",
            value: await this.eth_requestAccounts(),
          },
        ],
        date: Date.now(),
      })),
    );

    this.setIsAuthorized(true);
    return response;
  };

  eth_accounts = async () => {
    if (this.getIsAuthorized() && this.isReady) {
      return this.eth_requestAccounts();
    }
    return [];
  };

  setChain(chainId: number | string) {
    const normalized = normalizeChainId(chainId);

    if (this.connectedNetwork === normalized) return;
    this.ee.emit("chainChanged", toHex(normalized));
    this.connectedNetwork = normalized;
  }
  wallet_addEthereumChain = async (
    request: EIP1474Parameters<"wallet_addEthereumChain">,
  ): Promise<EIP1474ReturnType<"wallet_addEthereumChain">> => {
    const chainId = request[0].chainId;
    const cosmosProvider = await this.getCosmosProvider();

    const chainConfig = await this.resolveCosmosConfig(chainId);
    if (!("isNative" in chainConfig)) {
      await cosmosProvider.experimentalSuggestChain(chainConfig);
    }
    await cosmosProvider.enable(chainConfig.chainId);
    this.setChain(chainId);

    return null;
  };

  wallet_switchEthereumChain = this.wallet_addEthereumChain;

  async setup() {
    if (typeof window === "undefined") return;

    window.addEventListener(`${this.name}_keystorechange`, async () => {
      const accounts = await this.eth_requestAccounts();

      this.ee.emit("accountsChanged", accounts);
    });
    try {
      const cosmosProvider = await this.getCosmosProvider();

      if (!cosmosProvider) return;
      this.isReady = true;
    } catch (e) {
      // noop
    }
  }
}
