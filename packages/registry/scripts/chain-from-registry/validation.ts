import Ajv2020 from "ajv/dist/2020.js";

import chainSchema from "chain-token-registry/schema.chain.json" assert { type: "json" };
import tokenSchema from "chain-token-registry/schema.token.json" assert { type: "json" };
import { ChainRegistry, TokenRegistry } from "./types";

export const validateChain = new Ajv2020().compile<ChainRegistry>(chainSchema);
export const validateToken = new Ajv2020().compile<TokenRegistry>(tokenSchema);
