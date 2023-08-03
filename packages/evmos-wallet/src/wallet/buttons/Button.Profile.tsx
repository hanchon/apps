import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { formatProviderAddress } from "../../internal/wallet/style/format";
import { Dispatch, SetStateAction } from "react";
import { ProvidersIcons } from "../../copilot/utils";

export const ButtonProfile = ({
  walletExtension,
  setShow,
}: {
  walletExtension: WalletExtension;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="font-sm text-pearl bg-darGray800 flex
     items-center justify-center space-x-3 rounded-full px-10 py-2
      font-bold"
      onClick={() => {
        setShow(true);
      }}
    >
      {ProvidersIcons[walletExtension.extensionName]}

      <span className="text-lg font-bold">
        {formatProviderAddress(walletExtension, true)}
      </span>
    </button>
  );
};
