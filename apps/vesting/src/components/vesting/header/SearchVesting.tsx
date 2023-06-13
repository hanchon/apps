// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import { Search } from "ui-helpers";
export const SearchVesting = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push({ pathname: "/", query: { account: value } });
  };
  const handleOnClick = () => {
    // TODO: redirects to vesting account or to 404
    handleRouting();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // TODO:redirects to vesting account or to 404
      handleRouting();
    }
  };
  const [value, setValue] = useState("");

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const props = {
    placeholder: "Search Accounts",
    handleKeyDown,
    handleOnClick,
    value,
    handleSetValue,
  };
  return <Search props={props} />;
};
