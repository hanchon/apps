import { useSelector } from "react-redux";
import OmosisABI from "./abi/OsmosisPrecompileABI.json";

import { StoreType } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";
import { BigNumber } from "@ethersproject/bignumber";

const OSMOSIS_PRECOMPILE_ADDRESS = '0x0000000000000000000000000000000000000901'

export function useOsmosisPrecompile() {
    const address = useSelector((state: StoreType) => state.wallet.value);
    
    async function swap({
        input, 
        output,
        amount,
        slippage_tolerance,
        window_seconds,
        receiver
    }:{
        input: string,
        output: string,
        amount: BigNumber,
        receiver: string,
        slippage_tolerance: number,
        window_seconds: number

    }) {

        return await writeContract({
            mode: "prepared",
            request: {
              address: OSMOSIS_PRECOMPILE_ADDRESS,
              abi: OmosisABI,
              functionName: "swap",
              account: address.evmosAddressEthFormat as `0x${string}`,
              args: [address, input, output, amount, slippage_tolerance, window_seconds, receiver],
            },
          });
    }
    return {
        swap
    }
}