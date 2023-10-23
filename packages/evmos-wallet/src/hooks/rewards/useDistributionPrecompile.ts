import DistributionABI from "../../abis/DistributionABI.json";
import { writeContract } from "wagmi/actions";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/Store";

const DISTRIBUTION_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000801";

export function useDistributionPrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);

  async function withdrawDelegatorRewards(
    delegatorAddress: string,
    validatorAddress: string,
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: DISTRIBUTION_CONTRACT_ADDRESS,
        abi: DistributionABI,
        functionName: "withdrawDelegatorRewards",

        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [delegatorAddress, validatorAddress, amount],
      },
    });
  }

  return {
    withdrawDelegatorRewards
  } as const;
}
