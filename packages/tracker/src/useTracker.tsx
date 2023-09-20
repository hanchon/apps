import { Dict } from "mixpanel-browser";
import { useMixpanel } from "./context/mixpanel";
import { DISABLE_TRACKER_LOCALSTORAGE } from "./constants";
import { useCallback } from "react";

export const useTracker = (event?: string, properties?: Dict) => {
  const mixpanel = useMixpanel();

  const handlePreClickAction = (extraProperties?: Dict) => {
    if (
      mixpanel !== null &&
      Object.prototype.hasOwnProperty.call(mixpanel, "config") &&
      event !== undefined &&
      (localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE) === null ||
        localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE) === "false")
    ) {
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel?.track(event, { ...properties, ...extraProperties });
    }
  };

  const disableMixpanel = () => {
    localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "true");
  };

  const enableMixpanel = () => {
    localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "false");
  };

  const sendEvent = useCallback(
    (trackingID: string, extraProperties?: Dict) => {
      if (
        mixpanel !== null &&
        Object.prototype.hasOwnProperty.call(mixpanel, "config") &&
        (localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE) === null ||
          localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE) === "false")
      ) {
        mixpanel?.track(trackingID, { ...extraProperties });
      }
    },
    [mixpanel]
  );

  return {
    handlePreClickAction,
    disableMixpanel,
    enableMixpanel,
    sendEvent,
  };
};
