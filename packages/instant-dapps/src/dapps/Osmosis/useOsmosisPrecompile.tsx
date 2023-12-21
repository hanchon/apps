import { useSelector } from "react-redux";
import OmosisABI from "./abi/OsmosisPrecompileABI.json";

import { StoreType } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";
import { BigNumber } from "@ethersproject/bignumber";

const OSMOSIS_PRECOMPILE_ADDRESS = "0x49620330d542354E553ae308A104DeCeF1367331";

export function useOsmosisPrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);

  async function swap({
    input,
    output,
    amount,
    // slippage_tolerance,
    // window_seconds,
    // receiver,
  }: {
    input: string;
    output: string;
    amount: BigNumber;
    // receiver: string;
    // slippage_tolerance: number;
    // window_seconds: number;
  }) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: OSMOSIS_PRECOMPILE_ADDRESS,
        abi: OmosisABI,
        functionName: "osmosisSwap",
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [amount, input, output, address.evmosAddressCosmosFormat],
        gas: BigInt(1227440),
      },
    });
  }
  return {
    swap,
  };
}
