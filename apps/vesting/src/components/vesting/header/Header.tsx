import { ConfirmButton, Modal } from "ui-helpers";
import { SearchVesting } from "./SearchVesting";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import { useState } from "react";
import { FundVestingAccount } from "./FundVestingAccount";
import { EnableVestingModal } from "./EnableVestingModal";
import { useTranslation } from "next-i18next";

export const Header = () => {
  const handleConfirmClick = () => {
    // TODO: open modal for creating vesting account
    setIsOpenModal(true);
    setModalContent(<FundVestingAccount />);
  };

  const value = useSelector((state: StoreType) => state.wallet.value);
  const [showModal, setIsOpenModal] = useState(false);
  const [showEnableModal, setIsOpenEnableModal] = useState(false);

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
              setIsOpenEnableModal(true);
            }}
            disabled={!value.active}
          />
          <ConfirmButton
            className="w-fit normal-case"
            text={t("fund.header.button.title")}
            onClick={handleConfirmClick}
            disabled={!value.active}
          />
        </div>
        <SearchVesting />
      </div>

      <Modal
        isOpen={showEnableModal}
        onClose={() => {
          setIsOpenEnableModal(false);
        }}
      >
        <EnableVestingModal />
      </Modal>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      >
        {modalContent}
      </Modal>
    </header>
  );
};
