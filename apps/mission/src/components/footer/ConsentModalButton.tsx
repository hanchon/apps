"use client";
import { useConsentModal } from "stateful-components/src/modals/ConsentModal/ConsentModal";

export const ConsentModalButton = () => {
  const { setIsOpen } = useConsentModal();
  return (
    <button onClick={() => setIsOpen(true, {})}>
      <p>Cookies Settings</p>
    </button>
  );
};
