import { useSelector } from "react-redux";
import StrideABI from "./abi/StridePrecompileABI.json";

import { StoreType, ethToBech32 } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";

const STRIDE_PRECOMPILE_ADDRESS = "0xaB7FF523b669A340b14950E4886eEc2536C84996";

export function useStridePrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);

  async function liquidStake({ amount }: { amount: string }) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STRIDE_PRECOMPILE_ADDRESS,
        abi: StrideABI,
        functionName: "liquidStakeEvmos",
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [
          amount,
          ethToBech32(address.evmosAddressEthFormat as `0x${string}`, "stride"),
          address.evmosAddressCosmosFormat,
        ],
        gas: BigInt(1227440),
      },
    });
  }
  return {
    liquidStake,
  };
}
