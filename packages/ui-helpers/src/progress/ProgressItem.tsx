// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { GroupStateI, SetUpAccountI } from "./types";
import { Button } from "./Button";
import { useStep } from "./useStep";
export const ProgressItem = ({
  step,
  index,
  length,
  statusButton,
  setGroupState,
}: {
  step: SetUpAccountI;
  index: number;
  length: number;
  statusButton: string;
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>;
}) => {
  const { text, status, textError, handleClick } = useStep(step, setGroupState);

  const props = {
    id: step.id,
    name: text,
    index,
    stepsLength: length,
    status,
    handleClick: handleClick,
    textError,
    statusButton,
  };

  return <Button props={props} />;
};
