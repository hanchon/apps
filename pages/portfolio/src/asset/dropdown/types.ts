// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { TableData, TableDataElement } from "../../utils/table/normalizeData";

export type DropdownTokensProps = {
  placeholder: string;
  data: TableDataElement[];
  setToken: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<string>>;
  setChain: Dispatch<SetStateAction<TableDataElement | undefined>>;
};

export type DropdownChainsProps = {
  placeholder: string;
  data: TableData;
  token: TableDataElement | undefined;
  chain: TableDataElement | undefined;
  setChain: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddress: Dispatch<SetStateAction<string>>;
};
