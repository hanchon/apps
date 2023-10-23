// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { QueryClient } from "@tanstack/react-query";

export interface SetUpAccountI {
  // update the names
  id: string;
  buttonText: string;
  checkAction: () => boolean | Promise<boolean>;
  loadingText: string[];
  doneText: string;
  actions: Array<(queryClient: QueryClient) => boolean | Promise<boolean>>;
  href?: string;
  hrefAction?: () => boolean;
  status: string;
  errorsText?: string[];
  tracker: {
    init: string;
    provider: string;
    successful: string;
    unsuccessful: string;
  };
}

export interface GroupStateI {
  id: string;
  index: number;
  status: string;
}

export interface HandleStepErrorsI {
  setStatus: (value: React.SetStateAction<string>) => void;
  setText: (value: React.SetStateAction<string>) => void;
  step: SetUpAccountI;
  setTextError: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  text: string;
}

export interface CompleteStepI {
  setStatus: (value: React.SetStateAction<string>) => void;
  setText: (value: React.SetStateAction<string>) => void;
  step: SetUpAccountI;
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>;
}
