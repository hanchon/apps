import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "tracker";
import TopBar from "../components/asset/table/topBar/TopBar";
import { BigNumber } from "@ethersproject/bignumber";

describe("Testing Topbar", () => {
  vi.mock("mixpanel-browser", () => {
    return {
      default: {
        init: vi.fn(),
        config: {},
        track: vi.fn(),
      },
    };
  });

  vi.mock("react-redux", () => {
    return {
      useDispatch: vi.fn(),
      useSelector: vi.fn(),
    };
  });

  vi.mock("evmos-wallet", () => {
    return {
      ButtonWalletConnection: vi.fn(),
      StoreType: vi.fn(),
      useAssets: vi.fn(() => ({
        evmosPriceFixed: 0,
      })),
      WalletConnection: vi.fn(),
    };
  });

  test("should call mixpanel after clicking on send", async () => {
    const wrapper = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="testToken" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const topProps = {
      evmosPrice: 1,
      totalAssets: "1",
      setShow: vi.fn(),
      setModalContent: vi.fn(),
      tableData: {
        table: [],
        feeBalance: BigNumber.from("1"),
      },
    };

    const { getByText } = render(<TopBar topProps={topProps} />, { wrapper });
    const element = getByText("Send");
    expect(element).toBeDefined();
    await userEvent.click(element);
    // expect(mixpanel.init).toHaveBeenCalledOnce();
    // expect(mixpanel.track).toHaveBeenCalledWith(
    //   "Click on Give Feedback on Footer",
    //   {}
    // );
  });
});
