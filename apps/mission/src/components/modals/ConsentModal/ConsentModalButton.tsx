"use client";
import { useConsentModal } from "./ConsentModal";

export const ConsentModalButton = () => {
  const { setIsOpen } = useConsentModal();
  return (
    <button onClick={() => setIsOpen(true, {})}>
      <p>Cookies Settings</p>
    </button>
  );
};
