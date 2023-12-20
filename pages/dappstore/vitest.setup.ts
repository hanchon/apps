import { setConfig } from "next/config";
import config from "./next.config.mjs";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import mixpanel from "mixpanel-browser";
import { enableMixpanel } from "tracker";

setConfig(config);

const TOKEN = "testToken";
const initializeMixpanelAndEnable = () => {
  mixpanel.init(TOKEN, { ip: false });
  enableMixpanel();
};
beforeEach(() => {
  vi.spyOn(mixpanel, "init");
  vi.spyOn(mixpanel, "track");
  initializeMixpanelAndEnable();
});
afterEach(() => {
  cleanup();
});
