/**
 * Represents a hexadecimal address with a "0x" prefix.
 */
export type HexAddress = `0x${string}`;

export type CosmosAddress = `${string}1${string}`;

/**
 * Represents an address that can be either a hexadecimal address or an Evmos address with a custom prefix.
 * @template TPrefix - The custom prefix for the Cosmos address.
 */
export type Address = HexAddress | CosmosAddress;
