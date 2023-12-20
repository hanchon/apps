// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_BUTTON_CONVERT, disableMixpanel } from "tracker";

import { SubRowContent } from "./SubRowContent";
import { BigNumber } from "@ethersproject/bignumber";
// same as vitest.setup.ts
const TOKEN = "testToken";
const MOCKED_TOKEN = {
  name: "Wrapped Ether",
  symbol: "gWETH",
  decimals: 18,
  erc20Balance: BigNumber.from(20000000000000),
  cosmosBalance: BigNumber.from(0),
  tokenName: "gWETH",
  tokenIdentifier: "WETH",
  description: "Wrapped Ether via Gravity Bridge",
  coingeckoPrice: 2213.16,
  chainId: "gravity-bridge-3",
  chainIdentifier: "Gravity",
  handledByExternalUI: null,
  erc20Address: "0xc03345448969Dd8C00e9E4A85d2d9722d093aF8E",
  pngSrc:
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gweth.png",
  prefix: "gravity",
};
describe("Testing Tab Nav Item ", () => {
  vi.mock("react-redux", () => {
    return {
      useDispatch: vi.fn(),
      useSelector: vi.fn(),
    };
  });
  vi.mock("@evmosapps/evmos-wallet", () => {
    return {
      EVMOS_SYMBOL: "EVMOS",
    };
  });
  test("should call mixpanel event for convert button", async () => {
    const { getByText } = render(
      <SubRowContent
        item={MOCKED_TOKEN}
        setIsOpen={vi.fn()}
        setModalContent={vi.fn()}
        feeBalance={BigNumber.from(1)}
        isIBCBalance={true}
      />
    );
    const button = getByText("Convert");
    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_BUTTON_CONVERT, {
      Token: MOCKED_TOKEN.tokenName,
      token: TOKEN,
    });
  });
  test("should not call mixpanel event for convert button", async () => {
    disableMixpanel();
    const { getByText } = render(
      <SubRowContent
        item={MOCKED_TOKEN}
        setIsOpen={vi.fn()}
        setModalContent={vi.fn()}
        feeBalance={BigNumber.from(1)}
        isIBCBalance={true}
      />
    );

    const button = getByText("Convert");
    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
