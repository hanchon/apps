const RELOAD = "reload";
const COPILOT = "copilot";

export const checkReloadFlagToReloadModal = () =>
  window.localStorage.getItem(RELOAD);

export const setReloadFlagToReloadModal = (value: string) =>
  window.localStorage.setItem(RELOAD, value);

export const setCopilotFlagToReloadModal = (value: string) =>
  window.localStorage.setItem(COPILOT, value);

export const checkCopilotFlagToReloadModal = () =>
  window.localStorage.getItem(COPILOT);

export const removeCopilotFlagOnLoad = () =>
  window.localStorage.removeItem(COPILOT);

export const removeReloadFlagOnLoad = () =>
  window.localStorage.removeItem(RELOAD);
