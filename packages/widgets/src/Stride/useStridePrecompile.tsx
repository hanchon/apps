import { useSelector } from "react-redux";
import StrideABI from "./abi/StrideTempABI.json";

import { StoreType, ethToBech32 } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";
import { useConfig } from "wagmi";

// const STRIDE_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000000900";
const STRIDE_PRECOMPILE_ADDRESS = "0xeE44c15a354F72bb787FFfe2975872380E37afED"
const CHANNEL_ID = "channel-215";
const WEVMOS_ERC20_ADDRESS = "0xcc491f589b45d4a3c679016195b3fb87d7848210";

export function useStridePrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);
  const config = useConfig();
  async function liquidStake({ amount }: { amount: string }) {
    return await writeContract(config, {
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
    });
  }
  return {
    liquidStake,
  };
}
