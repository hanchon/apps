// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { KEPLR_DOWNLOAD_URL, STEP_STATUS } from "constants-helper";

import {
  connectWith,
  getActiveProviderKey,
  getGlobalKeplrProvider,
} from "evmos-wallet";
import { E } from "helpers";

const RELOAD_KEPLR = "reloadKeplr";
const MODAL_KEPLR = "modalKeplr";

export const checkReloadFlagToReloadKeplrModal = () =>
  window.localStorage.getItem(RELOAD_KEPLR);

export const setReloadFlagToReloadKeplrModal = (value: string) =>
  window.localStorage.setItem(RELOAD_KEPLR, value);

export const setKeplrFlagToReloadModal = (value: string) =>
  window.localStorage.setItem(MODAL_KEPLR, value);

export const checkKeplrFlagToReloadModal = () =>
  window.localStorage.getItem(MODAL_KEPLR);

export const removeKeplrFlagOnLoad = () =>
  window.localStorage.removeItem(MODAL_KEPLR);

export const removeReloadKeplrFlagOnLoad = () =>
  window.localStorage.removeItem(RELOAD_KEPLR);

const connectKeplr = (href: string) => {
  if (getGlobalKeplrProvider() === null) {
    setKeplrFlagToReloadModal("true");
    window.open(href, "_blank");

    return false;
  }
  return true;
};

const installKeplr = () => {
  removeKeplrFlagOnLoad();
  removeReloadKeplrFlagOnLoad();
  if (getGlobalKeplrProvider() === null) {
    return false;
  }
  return true;
};

const reloadPage = () => {
  // for chrome and brave we need to reload the page to know if the user has Keplr installed
  if (getGlobalKeplrProvider()) {
    return true;
  } else {
    if (
      getGlobalKeplrProvider() === null &&
      checkReloadFlagToReloadKeplrModal() === null &&
      checkKeplrFlagToReloadModal() === "true"
    ) {
      setReloadFlagToReloadKeplrModal("true");

      window.location.reload();
      return false;
    }
    return false;
  }
};

const checkConnectionKeplr = () => {
  if (getActiveProviderKey() === "keplr") {
    return true;
  }
  return false;
};

const switchToKeplr = async () => {
  if (getActiveProviderKey() === "keplr") {
    return true;
  } else {
    const [e] = await E.try(() => connectWith("keplr"));
    if (e === null) {
      return true;
    } else {
      return false;
    }
  }
};

export const stepsSetAccountKeplr = [
  {
    id: "install",
    buttonText: "Install Keplr",
    checkAction: () => installKeplr(),
    loadingText: ["Waiting for Keplr Setup"],
    doneText: "Keplr Installed",
    actions: [() => connectKeplr(KEPLR_DOWNLOAD_URL)],
    errorsText: ["Keplr not installed"],
    href: KEPLR_DOWNLOAD_URL,
    hrefAction: () => reloadPage(),
    status: STEP_STATUS.CURRENT,
    // TODO: update the tracker events
    tracker: {
      init: "init",
      provider: "Keplr",
      successful: "successful",
      unsuccessful: "unsuccessful",
    },
  },

  {
    id: "connect",
    buttonText: "Switch to Keplr",
    checkAction: () => checkConnectionKeplr(),
    loadingText: ["Approve on Keplr"],
    actions: [() => switchToKeplr()],
    errorsText: ["Approval Rejected, please try again"],
    doneText: "Keplr Connected",
    status: STEP_STATUS.NOT_PROCESSED,
    // TODO: update the tracker events
    tracker: {
      init: "init",
      provider: "Keplr",
      successful: "successful",
      unsuccessful: "unsuccessful",
    },
  },
];
