// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

import { SmallButton, ConfirmButton } from "@evmosapps/ui-helpers";
import { Delegate } from "./transactions/Delegate";
import { Redelegate } from "./transactions/Redelegate";
import { Undelegate } from "./transactions/Undelegate";
import { convertAndFormat, formatPercentage } from "helpers";
import {
  CLICK_BUTTON_MANAGE_DELEGATE,
  CLICK_BUTTON_MANAGE_UNDELEGATE,
  CLICK_BUTTON_MANAGE_REDELEGATE,
  sendEvent,
} from "tracker";
import { EVMOS_DECIMALS } from "@evmosapps/evmos-wallet";
import { ModalDelegate } from "../../../utils/types";

const Staking = ({
  item,
  setIsOpen,
}: {
  item: ModalDelegate;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showDelegate, setIsOpenDelegate] = useState(false);
  const [showRedelegate, setIsOpenRedelegate] = useState(false);
  const [showUndelegate, setIsOpenUndelegate] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <p className="font-bold">{item.moniker}</p>
        <p className="text-xs">
          Commission - {formatPercentage(item.commissionRate)}
        </p>
      </div>
      {showRedelegate && (
        <div className="rounded-md border border-darkGray1 p-3 text-sm">
          <p>
            Once you undelegate your staked EVMOS, you will need to wait 14 days
            for your tokens to be liquid
          </p>
        </div>
      )}
      {showDelegate && (
        <div className="rounded-md border border-darkGray1 p-3 text-sm">
          <p className="font-bold text-red-300">
            Staking will lock up your funds for 14 days
          </p>
          <p>
            Once you undelegate your staked EVMOS, you will need to wait 14 days
            for your tokens to be liquid
          </p>
        </div>
      )}
      <div className="flex justify-between">
        {showUndelegate ? (
          <p className="font-bold">Available for Undelegation</p>
        ) : (
          <p className="font-bold">My Delegation</p>
        )}
        <p>
          {item.balance !== ""
            ? convertAndFormat(BigNumber.from(item.balance), EVMOS_DECIMALS, 6)
            : "0"}{" "}
          EVMOS
        </p>
      </div>
      {(item.details || item.website) &&
        !showDelegate &&
        !showRedelegate &&
        !showUndelegate && (
          <div className="space-y-2">
            <p className="font-bold">Description</p>
            <p className="text-sm">{item.details}</p>
            {item.website && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={item.website}
                className="text-sm font-bold text-red-300"
              >
                {item.website}
              </Link>
            )}
          </div>
        )}
      {showDelegate && (
        <Delegate
          item={item}
          setIsOpen={setIsOpen}
          setIsOpenDelegate={setIsOpenDelegate}
        />
      )}

      {showRedelegate && (
        <Redelegate
          item={item}
          setIsOpen={setIsOpen}
          setIsOpenRedelegate={setIsOpenRedelegate}
        />
      )}
      {showUndelegate && (
        <Undelegate
          item={item}
          setIsOpen={setIsOpen}
          setIsOpenUndelegate={setIsOpenUndelegate}
        />
      )}
      {!showDelegate && !showRedelegate && !showUndelegate && (
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-0 md:justify-end md:space-x-3">
          <SmallButton
            text="UNDELEGATE"
            onClick={() => {
              sendEvent(CLICK_BUTTON_MANAGE_UNDELEGATE);
              setIsOpenUndelegate(true);
            }}
            className="w-fit text-xs"
          />
          <ConfirmButton
            text="Delegate"
            onClick={() => {
              sendEvent(CLICK_BUTTON_MANAGE_DELEGATE);
              setIsOpenDelegate(true);
            }}
            className="w-fit py-1 text-sm"
          />

          {item.balance !== "" && (
            <ConfirmButton
              text="Redelegate"
              onClick={() => {
                sendEvent(CLICK_BUTTON_MANAGE_REDELEGATE);
                setIsOpenRedelegate(true);
              }}
              className="w-fit py-1 text-sm"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Staking;
