/**
 * this tailwind is only used for vscode tailwindcss intellisense
 */

const sharedConfig = require("@evmosapps/config/tailwind/base.js");

module.exports = {
  ...sharedConfig,
  content: ["packages/{apps,packages,pages}/*/src/**/*.{js,jsx,ts,tsx}"],
};
