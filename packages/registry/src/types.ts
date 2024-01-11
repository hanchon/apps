import { ChainEntity } from "../autogen/chain-entity";

type ChainEntityConfiguration = ChainEntity["configurations"][0];
export type ChainType = ChainEntityConfiguration["configurationType"];
