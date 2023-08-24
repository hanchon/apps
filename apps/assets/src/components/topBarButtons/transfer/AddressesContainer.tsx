import { CopyContainer } from "./CopyContainer";
import { useAccount } from "wagmi";
import { ethToEvmos } from "@evmos/address-converter";
export const AddressesContainer = () => {
  const copyToClipboard = async (wallet: string) => {
    await navigator.clipboard.writeText(wallet);
  };

  const wallet = useAccount();

  const handleCosmosFormat = async () => {
    await copyToClipboard(ethToEvmos(wallet.address as string));
  };

  const handleEthFormat = async () => {
    await copyToClipboard(wallet.address as string);
  };

  return (
    <div className="flex flex-col space-y-1">
      <CopyContainer
        address={ethToEvmos(wallet.address as string)}
        handleOnClick={handleCosmosFormat}
      />

      <CopyContainer
        address={wallet.address as string}
        handleOnClick={handleEthFormat}
      />
    </div>
  );
};
