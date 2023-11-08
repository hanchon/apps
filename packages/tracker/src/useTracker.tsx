import mixpanel, { Dict } from "mixpanel-browser";

import { DISABLE_TRACKER_LOCALSTORAGE } from "./constants";
import { Log } from "helpers";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "", {
  ip: false,
});

export const sendEvent = (trackingID: string, extraProperties?: Dict) => {
  const mixpanelIsActive =
    Object.prototype.hasOwnProperty.call(mixpanel, "config") &&
    (localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE) === null ||
      localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE) === "false");

  Log.table({
    ["Tracking ID"]: trackingID,
    ["Extra Properties"]: extraProperties,
    ["Mixpanel is active"]: mixpanelIsActive,
  });

  if (mixpanelIsActive) mixpanel.track(trackingID, { ...extraProperties });
};
export const useTracker = (event?: string, properties?: Dict) => {
  const disableMixpanel = () => {
    localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "true");
  };

  const enableMixpanel = () => {
    localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "false");
  };

  const handlePreClickAction = (extraProperties?: Dict) => {
    if (event === undefined) return;
    sendEvent(event, { ...properties, ...extraProperties });
  };

  return {
    handlePreClickAction,
    disableMixpanel,
    enableMixpanel,
    sendEvent,
  };
};
