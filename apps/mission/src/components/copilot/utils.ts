const RELOAD = "reload";
const COPILOT = "copilot";

export const getReloadFromLocalStorage = () =>
  window.localStorage.getItem(RELOAD);

export const setReloadLocalStorage = (value: string) =>
  window.localStorage.setItem(RELOAD, value);

export const setCopilotLocalStorage = (value: string) =>
  window.localStorage.setItem(COPILOT, value);

export const getCopilotFromLocalStorage = () =>
  window.localStorage.getItem(COPILOT);

export const removeCopilotLocalStorage = () =>
  window.localStorage.removeItem(COPILOT);

export const removeReloadLocalStorage = () =>
  window.localStorage.removeItem(RELOAD);
