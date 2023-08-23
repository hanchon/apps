const config = async () =>
  (await import("@evmos-apps/config/eslint/base.js")).default;
module.exports = config();
