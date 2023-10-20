import { mnemonicToAccount } from "viem/accounts";
import { bech32 } from "bech32";

export const makeAccount = (
  key: string,
  mnemonic: string,
  initialBalance = 10000000n
) => {
  const { address, publicKey } = mnemonicToAccount(mnemonic);
  const words = bech32.toWords(Buffer.from(address.slice(2), "hex"));
  return {
    key,
    mnemonic,
    hexAddress: address,
    evmosAddress: bech32.encode("evmos", words),

    publicKey,
    initialBalance,
  };
};
