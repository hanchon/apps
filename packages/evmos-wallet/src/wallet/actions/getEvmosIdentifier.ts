import { raise } from "helpers/src/error-handling";
import { getChainId } from "wagmi/actions";
import { wagmiConfig } from "..";

export const getEvmosConfig = () => {
  return (
    wagmiConfig.chains.find((chain) => chain.id === getChainId(wagmiConfig)) ??
    raise("Evmos chain not found")
  );
};

export const getEvmosIdentifier = () => getEvmosConfig().ref;
