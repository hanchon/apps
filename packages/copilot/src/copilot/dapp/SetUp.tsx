// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { StepsContext } from "../container/StepsContext";
import { Button } from "./Button";

export const SetUpDapp = ({ status }: { status: string }) => {
  const { setShowModal } = useContext(StepsContext);
  return (
    <Button
      text="Let's go"
      onClick={() => {
        setShowModal(true);
      }}
      status={status}
    />
  );
};
