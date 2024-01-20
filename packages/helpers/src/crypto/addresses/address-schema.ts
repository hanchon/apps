// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { Address } from "./types";
import { isValidCosmosAddress } from "./is-valid-cosmos-address";
import { isValidHexAddress } from "./is-valid-hex-address";

export const AddressSchema = z.custom<Address>(
  (address) => !!(isValidCosmosAddress(address) || isValidHexAddress(address)),
  { message: "Invalid address" },
);
