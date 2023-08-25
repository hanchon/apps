// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const MODAL_STATE = "copilotState";
const MODAL_STATE_DEFAULTS = {
  reloadMetaMask: false,
  modalCopilotFlag: false,
};
type CopilotModalState = typeof MODAL_STATE_DEFAULTS;

export const getCopilotModalState = () => {
  const state = localStorage.getItem(MODAL_STATE);
  if (!state) {
    return MODAL_STATE_DEFAULTS;
  }
  return JSON.parse(state) as CopilotModalState;
};
export const updateCopilotModalState = (state: Partial<CopilotModalState>) => {
  const newState = { ...getCopilotModalState(), ...state };
  localStorage.setItem(MODAL_STATE, JSON.stringify(newState));
  return newState;
};

export const removeCopilotModalStateFromLocalStorage = () => {
  localStorage.removeItem(MODAL_STATE);
};
