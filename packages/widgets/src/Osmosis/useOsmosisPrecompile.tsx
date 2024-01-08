import { useSelector } from "react-redux";
import OmosisABI from "./abi/OsmosisPrecompileABI.json";

import { StoreType } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";
import { BigNumber } from "@ethersproject/bignumber";
import { useConfig } from "wagmi";

const OSMOSIS_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000000901";

const CHANNEL_ID = "channel-215";
const CXS_CONTRACT =
  // eslint-disable-next-line no-secrets/no-secrets
  "osmo1a34wxsxjwvtz3ua4hnkh4lv3d4qrgry0fhkasppplphwu5k538tqcyms9x";
const TIMEOUT = 10;

export function useOsmosisPrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);
  const config = useConfig();
  async function swap({
    input,
    output,
    amount,
    slippage_tolerance,
  }: {
    input: string;
    output: string;
    amount: BigNumber;
    slippage_tolerance: number;
  }) {
    return await writeContract(
      config,

      {
        address: OSMOSIS_PRECOMPILE_ADDRESS,
        abi: OmosisABI,
        functionName: "swap",
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [
          [
            CHANNEL_ID,
            CXS_CONTRACT,
            address.evmosAddressEthFormat,
            input,
            output,
            amount,
            slippage_tolerance,
            TIMEOUT,
            address.evmosAddressCosmosFormat,
          ],
        ],
        gas: BigInt(1227440),
      }
    );
  }
  return {
    swap,
  };
}
