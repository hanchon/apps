// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import slugify from "slugify";

export const createSlug = (name: string) =>
  slugify(name, { lower: true, strict: true });