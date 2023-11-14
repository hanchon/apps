import { BannerMessages, Modal } from "ui-helpers";
import { useCallback, useState } from "react";
import { ClawbackModal } from "./modal/ClawbackModal";
import { getVestingAccountNameLocalstorage } from "../helpers";
import { useVestingAccounts } from "../../../internal/hooks/useVesting";
import { AccountContent } from "./modal/AccountContent";
import { normalizeToEvmos } from "evmos-wallet";

export const AccountDetails = ({ account = "" }: { account?: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  const _account = normalizeToEvmos(account);
  const { loading, error, vestingDetails } = useVestingAccounts(_account);

  const handleClawbackClick = useCallback(() => {
    setShowModal(true);
    if (typeof vestingDetails !== "string") {
      setModalContent(<ClawbackModal vestingDetails={vestingDetails} />);
    }
  }, [vestingDetails]);

  const drawContentVesting = useCallback(() => {
    if (loading) {
      return <BannerMessages text="Loading..." spinner={true} />;
    }
    if (error) {
      return <BannerMessages text="No results" />;
    }
    if (typeof vestingDetails === "string") {
      return <BannerMessages text={vestingDetails} />;
    }
    const accountName = getVestingAccountNameLocalstorage(
      vestingDetails.accountAddress,
    );

    return (
      <AccountContent
        vestingDetails={vestingDetails}
        accountName={accountName}
        handleClawbackClick={handleClawbackClick}
      />
    );
  }, [error, loading, vestingDetails, handleClawbackClick]);

  return (
    <>
      {drawContentVesting()}
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
};
