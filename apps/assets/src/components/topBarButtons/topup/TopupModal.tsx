const Copilot = dynamic(() => import("copilot").then((mod) => mod.Copilot));
import { useModal } from "helpers";
import dynamic from "next/dynamic";
import { StepsContext, StepsContextProvider, topUpStep } from "copilot";
import { useContext, useEffect } from "react";

export const useTopupModal = () => useModal("topup");

export const TopupModalController = () => {
  const { isOpen, setIsOpen } = useTopupModal();
  const { showModal, setShowModal } = useContext(StepsContext);
  useEffect(() => {
    if (showModal === isOpen) {
      return;
    }
    setIsOpen(showModal);
  }, [isOpen, setIsOpen, showModal]);

  useEffect(() => {
    if (showModal === isOpen) {
      return;
    }

    setShowModal(isOpen);
  }, [isOpen, setShowModal, showModal]);

  return <Copilot />;
};
export const TopupModal = () => {
  return (
    <StepsContextProvider steps={topUpStep}>
      <TopupModalController />
    </StepsContextProvider>
  );
};
