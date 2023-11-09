const Copilot = dynamic(() => import("copilot").then((mod) => mod.Copilot));
import { useEffectEvent, useModal } from "helpers";
import dynamic from "next/dynamic";
import { StepsContext, StepsContextProvider, topUpStep } from "copilot";
import { useContext, useEffect } from "react";

export const useTopupModal = () => useModal("topup");

export const TopupModalController = () => {
  const { isOpen, setIsOpen } = useTopupModal();
  const { showModal, setIsOpenModal } = useContext(StepsContext);
  const setSyncedIsOpen = useEffectEvent((syncedIsOpen: boolean) => {
    if (syncedIsOpen !== isOpen) {
      setIsOpen(syncedIsOpen);
    }
    if (syncedIsOpen !== showModal) {
      setIsOpenModal(syncedIsOpen);
    }
  })
  useEffect(() => {
    setSyncedIsOpen(showModal);
  }, [showModal, setSyncedIsOpen]);

  useEffect(() => {

    setSyncedIsOpen(isOpen);
  }, [isOpen, setSyncedIsOpen]);

  return <Copilot />;
};
export const TopupModal = () => {
  return (
    <StepsContextProvider steps={topUpStep}>
      <TopupModalController />
    </StepsContextProvider>
  );
};
