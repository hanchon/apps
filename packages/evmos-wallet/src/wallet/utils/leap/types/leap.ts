import Long from "long";
import { Key } from "./key";
//  should it use the one that is defined on Leap? Reference: https://github.com/leapwallet/cosmos-extension/blob/main/packages/wallet-provider/src/provider/types/chain-info.ts
import { ChainInfo, EthSignType } from "@keplr-wallet/types";
import {
  AminoSignResponse,
  OfflineAminoSigner,
  StdSignDoc,
} from "@cosmjs/amino";
import {
  DirectSignResponse,
  OfflineDirectSigner,
  OfflineSigner,
} from "@cosmjs/proto-signing";
export interface Leap {
  enable(chainIds: string | string[]): Promise<void>;
  experimentalSuggestChain(chainInfo: ChainInfo): Promise<void>;
  getKey(chainId: string): Promise<Key>;
  signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: LeapSignOptions,
  ): Promise<AminoSignResponse>;
  signDirect(
    chainId: string,
    signer: string,
    signDoc: {
      /** SignDoc bodyBytes */
      bodyBytes?: Uint8Array | null;

      /** SignDoc authInfoBytes */
      authInfoBytes?: Uint8Array | null;

      /** SignDoc chainId */
      chainId?: string | null;

      /** SignDoc accountNumber */
      accountNumber?: Long | null;
    },
    signOptions?: LeapSignOptions,
  ): Promise<DirectSignResponse>;
  getEnigmaPubKey(chainId: string): Promise<Uint8Array>;
  getEnigmaTxEncryptionKey(
    chainId: string,
    nonce: Uint8Array,
  ): Promise<Uint8Array>;
  enigmaEncrypt(
    chainId: string,
    contractCodeHash: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    msg: object,
  ): Promise<Uint8Array>;
  enigmaDecrypt(
    chainId: string,
    ciphertext: Uint8Array,
    nonce: Uint8Array,
  ): Promise<Uint8Array>;
  getOfflineSigner(
    chainId: string,
    signOptions?: LeapSignOptions,
  ): OfflineSigner & OfflineDirectSigner;
  getOfflineSignerOnlyAmino(
    chainId: string,
    signOptions?: LeapSignOptions,
  ): OfflineAminoSigner;
  signEthereum(
    chainId: string,
    signer: string,
    data: string | Uint8Array,
    type: EthSignType,
  ): Promise<Uint8Array>;
}

export type LeapMode = "core" | "extension" | "mobile-web" | "walletconnect";

export interface LeapSignOptions {
  readonly preferNoSetFee?: boolean;
  readonly preferNoSetMemo?: boolean;
  readonly disableBalanceCheck?: boolean;
}

export interface LeapIntereactionOptions {
  readonly sign?: LeapSignOptions;
}
