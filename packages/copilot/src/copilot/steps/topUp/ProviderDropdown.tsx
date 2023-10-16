// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useState } from "react";

import { DropdownArrow } from "icons";
import { t } from "../../../locales/translate";
import { DropdownOption } from "./utils";

export default function ProvDropwdown({
  selectedValue,
  dropdownOptions,
  onItemClick,
}: {
  selectedValue: DropdownOption;
  dropdownOptions: DropdownOption[];
  onItemClick: (option: DropdownOption) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative w-full cursor-pointer rounded text-left text-black ">
      <div
        data-testid="card-provider-dropdown"
        onClick={handleInputClick}
        className="flex select-none items-center justify-between p-1"
      >
        {showMenu && (
          <div className="border-gray300 absolute -right-1 top-2 z-[9999] max-h-40 w-36 translate-y-9 overflow-auto rounded-md border bg-white md:w-60">
            {dropdownOptions?.map((option) => {
              return (
                <button
                  onClick={() => onItemClick(option)}
                  key={option.value}
                  className={`hover:bg-gray flex w-full flex-1 cursor-pointer justify-between space-x-8 p-3 font-bold
                      `}
                >
                  <div className="flex items-center gap-1">
                    <div>
                      <div>{option.image}</div>
                    </div>
                    <span className="text-sm">{option.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
        <span className="text-sm text-[#374151]">
          {t("topup.onboard.card.provider")}
        </span>
        <div className="border-gray300 -mr-2 flex w-36 items-center justify-between space-x-3 rounded-md border p-1.5 font-bold md:w-60">
          <div className="flex items-center gap-1">
            {selectedValue?.image}
            <span className="text-sm"> {selectedValue?.name}</span>
          </div>
          <DropdownArrow />
        </div>
      </div>
    </div>
  );
}
