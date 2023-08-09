// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Copilot } from "../Copilot";
import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";

export const Button = ({
  text,
  className,
  onClick,
  status,
}: {
  text: string;
  className?: string;
  onClick: () => void;
  status?: string;
}) => {
  return (
    <>
      <Copilot />
      {status === STEP_STATUS.CURRENT && (
        <button
          onClick={onClick}
          className={` w-fit rounded p-3 text-sm font-bold ${
            className !== undefined ? className : "text-red bg-pearl"
          } }`}
        >
          {text}
        </button>
      )}
    </>
  );
};
