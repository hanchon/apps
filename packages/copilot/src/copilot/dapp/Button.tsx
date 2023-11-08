// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Copilot } from "../Copilot";
import { STEP_STATUS } from "constants-helper";

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
        // TODO: reuse primarybutton with variant secondary
        <button
          onClick={onClick}
          className={` w-fit rounded px-6 py-3 text-sm font-bold transition-all duration-200 ease-in-out ${
            className !== undefined
              ? className
              : "text-red bg-pearl hover:bg-[#e3d6c3] active:bg-[#ccc0af]"
          } }`}
        >
          {text}
        </button>
      )}
    </>
  );
};
