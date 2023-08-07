import { useContext } from "react";
import { StepsContext } from "../container/StepsContext";
import { Button } from "./Button";

export const SetUpDapp = () => {
  const { setShowModal } = useContext(StepsContext);
  return (
    <Button
      text="Let's go"
      onClick={() => {
        setShowModal(true);
      }}
    />
  );
};
