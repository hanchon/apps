import { STEP_STATUS } from "constants-helper";

// TODO: update with actual functions
export const stepsSetAccountKeplr = [
  {
    id: "install",
    buttonText: "Install Keplr",
    checkAction: () => false,
    loadingText: ["Waiting for Keplr Setup"],
    doneText: "Keplr Installed",
    actions: [() => false],
    errorsText: ["Keplr not installed"],
    href: "",
    hrefAction: () => false,
    status: STEP_STATUS.CURRENT,
    tracker: {
      init: "",
      provider: "Keplr",
      successful: "=",
      unsuccessful: "",
    },
  },

  {
    id: "connect",
    buttonText: "Connect with Keplr",
    checkAction: () => false,
    loadingText: [
      "Approve on Keplr",
      "",
      "Press Next and Connect",
      "Press Sign",
    ],
    actions: [() => false],
    errorsText: [
      "Approval Rejected, please try again",
      "You need to switch the network to Evmos, please try again",
      "Get accounts rejected, please try again",
      "Sign rejected, please try again",
    ],
    doneText: "Keplr Connected",
    status: STEP_STATUS.NOT_PROCESSED,
    tracker: {
      init: "",
      provider: "Keplr",
      successful: "=",
      unsuccessful: "",
    },
  },
];
