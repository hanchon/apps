// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe } from "vitest";
import { render } from "@testing-library/react";

import { SetupWithMetamaskSteps } from "./setup-with-metamask";

describe.skip("Testing Setup With Metamask ", () => {
  test("should call mixpanel event for tab navItem - Staking", () => {
    const {} = render(<SetupWithMetamaskSteps />);
  });
});
