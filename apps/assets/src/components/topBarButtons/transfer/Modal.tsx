import { ModalContainer } from "../ModalContainer";
import { Content } from "./Content";
import { Introduction } from "./Introduction";

export const TransferModal = () => {
  return (
    <ModalContainer
      introduction={
        <Introduction
          title="Transfer Assets"
          description="Deposit and send assets to any account on any chain."
        />
      }
      content={<Content />}
    />
  );
};
