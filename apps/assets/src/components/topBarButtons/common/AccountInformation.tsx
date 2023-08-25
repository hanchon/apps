// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { AddressesContainer } from "./AddressesContainer";

export const AccountInformation = () => {
  return (
    <div className="flex flex-col space-y-2 text-[10px] h-full justify-end">
      <div>
        <div className="flex items-center space-x-1">
          <h3 className="font-bold">Account information</h3>
          {/* the hover is applied on all the height. We want it only in the icon */}
          {/* <Tooltip
          className="min-w-[10rem]"
          element={<InformationIcon width={15} height={15} />}
          text="The addresses below are the same but in different formats. We provide this information for you to quickly refer to your address in instances like depositing assets into your account."
        /> */}
        </div>
      </div>

      <p>
        Below are your addresses based on the account you&apos;re logged into.
      </p>

      <AddressesContainer />
    </div>
  );
};
