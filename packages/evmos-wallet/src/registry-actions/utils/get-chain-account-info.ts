import { getChainByAddress } from "../get-chain-by-account";
import { Prefix } from "../types";
import { Address, getPubkey, normalizeToEvmos } from "../../wallet";
import { apiCosmosAccountByAddress } from "../../api";
import { isValidCosmosAddress } from "../../wallet/utils/addresses/is-valid-cosmos-address";
import * as secp256k1 from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/crypto/secp256k1/keys_pb";
import * as ethsecp256k1 from "@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb";

export const getChainAccountInfo = async (address: Address<Prefix>) => {
  const cosmosAddress = isValidCosmosAddress(address)
    ? address
    : normalizeToEvmos(address);

  const chain = getChainByAddress(address);

  const { account } = await apiCosmosAccountByAddress(
    chain.cosmosRest.http,
    cosmosAddress
  );

  if (account["@type"] === "/ethermint.types.v1.EthAccount") {
    return {
      address: cosmosAddress,
      sequence: account.base_account.sequence,
      publicKey: new ethsecp256k1.PubKey({
        key:
          account.base_account.pub_key?.key ??
          (await getPubkey({
            cosmosChainId: chain.cosmosId,
          })),
      }),
      accountNumber: account.base_account.account_number,
    };
  }

  if (account["@type"] === "/cosmos.auth.v1beta1.BaseAccount") {
    return {
      address: cosmosAddress,
      sequence: account.sequence,
      publicKey: new secp256k1.PubKey({
        key:
          account.pub_key?.key ??
          (await getPubkey({
            cosmosChainId: chain.cosmosId,
          })),
      }),
      accountNumber: account.account_number,
    };
  }

  throw new Error(`Unsupported account type: ${account["@type"]}`);
};
