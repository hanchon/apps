import { apiCosmosAccountByAddress } from "../api";
import { getChainByAddress } from "./get-chain-by-account";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { Address } from "helpers/src/crypto/addresses/types";

export const getAccountInfo = async ({ address }: { address: Address }) => {
  const chain = getChainByAddress(address);
  return await apiCosmosAccountByAddress(
    chain.cosmosRest,
    normalizeToCosmos(address)
  );
};
