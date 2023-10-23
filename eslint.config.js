const config = async () =>
  (await import("@evmosapps/config/eslint/base.js")).default;
module.exports = config();
