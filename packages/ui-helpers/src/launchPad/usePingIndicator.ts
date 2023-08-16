// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useCallback, useEffect, useState } from "react";

const FIRST_CLICK_LAUNCHER_PAD = "firstClickLauncherPad";

const setFirstClickLauncherPad = (value: string) => {
  window.localStorage.setItem(FIRST_CLICK_LAUNCHER_PAD, value);
};

export const getFirstClickLauncherPad = () => {
  return window.localStorage.getItem(FIRST_CLICK_LAUNCHER_PAD);
};

export const usePingIndicator = () => {
  const [showPing, setShowPing] = useState(false);

  const [showMessage, setShowMessage] = useState(true);

  const handlePingIndicator = useCallback(() => {
    if (getFirstClickLauncherPad() === null) {
      setFirstClickLauncherPad("true");
      setShowPing(false);
    }
  }, []);

  useEffect(() => {
    const firstClickLauncherPad = getFirstClickLauncherPad();
    if (firstClickLauncherPad === null) {
      setShowPing(true);
    }
  }, [showPing]);

  //   the message will disappear after setting the localstorage to true and the page is refreshed
  useEffect(() => {
    const firstClickLauncherPad = getFirstClickLauncherPad();
    if (firstClickLauncherPad !== null) {
      setShowMessage(false);
    }
  }, []);

  return { showPing, handlePingIndicator, showMessage };
};
