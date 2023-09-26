import { ConfirmButton, Modal } from "ui-helpers";
import { SearchVesting } from "./SearchVesting";
import { useSelector } from "react-redux";
import { KEPLR_KEY, StoreType } from "evmos-wallet";
import { useState } from "react";
import { FundVestingAccount } from "./FundVestingAccount";
import { EnableVestingModal } from "./EnableVestingModal";
import { useTranslation } from "next-i18next";
import { useAccount } from "wagmi";

export const Header = () => {
  const handleConfirmClick = () => {
    // TODO: open modal for creating vesting account
    setShowModal(true);
    setModalContent(<FundVestingAccount />);
  };

  const value = useSelector((state: StoreType) => state.wallet.value);
  const [showModal, setShowModal] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  const { t } = useTranslation();
  return (
    <header className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-end lg:space-x-2 lg:space-y-0">
      <div className="flex flex-col md:flex-row w-full justify-between space-y-3 md:space-y-0">
        <div className="flex gap-5">
          <ConfirmButton
            className="w-fit normal-case"
            text={t("enable.header.button.title")}
            onClick={() => {
              setShowEnableModal(true);
            }}
            disabled={!value.active || value.extensionName === KEPLR_KEY}
          />
          <ConfirmButton
            className="w-fit normal-case"
            text={t("fund.header.button.title")}
            onClick={handleConfirmClick}
            disabled={!value.active || value.extensionName === KEPLR_KEY}
          />
        </div>
        <SearchVesting />
      </div>

      <Modal
        show={showEnableModal}
        onClose={() => {
          setShowEnableModal(false);
        }}
      >
        <EnableVestingModal />
      </Modal>

      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {modalContent}
      </Modal>
    </header>
  );
};
