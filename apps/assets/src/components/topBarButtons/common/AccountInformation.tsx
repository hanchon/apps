// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { AddressesContainer } from "./AddressesContainer";
import { useTranslation } from "next-i18next";

export const AccountInformation = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-2 text-[10px] h-full justify-end">
      <div>
        <div className="flex items-center space-x-1">
          <h3 className="font-bold">{t("account.information.title")}</h3>
          {/* the hover is applied on all the height. We want it only in the icon */}
          {/* <Tooltip
          className="min-w-[10rem]"
          element={<InformationIcon width={15} height={15} />}
          text={t("account.information.tooltip") as string}
        /> */}
        </div>
      </div>

      <p>{t("account.information.description")}</p>

      <AddressesContainer />
    </div>
  );
};
