import { useContext } from "react";
import { StepsContext } from "../container/StepsContext";
import { Button } from "./Button";

export const TopUpDapp = () => {
  const { setShowModal } = useContext(StepsContext);
  return (
    <Button
      text="Top up account"
      onClick={() => {
        setShowModal(true);
      }}
    />
  );
};
