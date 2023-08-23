import { StoreType } from "evmos-wallet";
import { EvmosRedIcon } from "icons";
import { useSelector } from "react-redux";
import { Description, Title } from "ui-helpers";
import { CopyContainer } from "./CopyContainer";

export const Introduction = () => {
  const copyToClipboard = async (wallet: string) => {
    await navigator.clipboard.writeText(wallet);
  };

  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const handleCosmosFormat = async () => {
    await copyToClipboard(wallet.evmosAddressCosmosFormat);
  };

  const handleEthFormat = async () => {
    await copyToClipboard(wallet.evmosAddressEthFormat);
  };

  return (
    <section className="flex flex-col space-y-4 text-gray1">
      <EvmosRedIcon />
      {/* add i18 */}
      <Title>Transfer Assets</Title>
      <Description>
        Deposit and send assets to any account on any chain.
      </Description>
      <div className="flex flex-col space-y-2 pt-8 text-[10px]">
        <div>
          <div className="flex items-center space-x-1">
            <h3 className="font-bold">Account information</h3>
            {/* the hover is applied on all the height. We want it only in the icon */}
            {/* <Tooltip
            className="min-w-[10rem]"
            element={<InformationIcon width={15} height={15} />}
            text="The addresses below are the same but in different formats. We provide this information for you to quickly refer to your address in instances like depositing assets into your account."
          /> */}
          </div>
        </div>

        <p>
          Below are your addresses based on the account you&apos;re logged into.
        </p>

        <div className="flex flex-col space-y-1">
          <CopyContainer
            address={wallet.evmosAddressCosmosFormat}
            handleOnClick={handleCosmosFormat}
          />

          <CopyContainer
            address={wallet.evmosAddressEthFormat}
            handleOnClick={handleEthFormat}
          />
        </div>
      </div>
    </section>
  );
};
