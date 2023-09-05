import { test, describe } from "vitest";
import {
  prepareContractERC20Transfer,
  prepareContractIBCTransfer,
  prepareIBCMsgTransfer,
} from "./create-msg-transfer";
import { chains } from "@evmos-apps/registry";
import { CosmosAddress } from "../wallet";
import { bech32 } from "bech32";
import { Prefix } from "../registry-actions/types";
import { getChainByAddress } from "../registry-actions/get-chain-by-account";
const replacePrefix = (address: CosmosAddress, newPrefix: string) => {
  const { words } = bech32.decode(address);
  return bech32.encode(newPrefix, words) as CosmosAddress<Prefix>;
};
// axelar failed
// comdex failed
// cosmos failed
// cre failed
// emoney failed
// gravity failed
// inj failed
// juno failed
// osmo failed
// quick failed
// regen failed
// stars failed
// stride failed
// tori failed
const richAccounts = [
  // "cosmos15hmqrc245kryaehxlch7scl9d9znxa58qkpjet",
  // "axelar14k7jpx6u0fj4yl273yu5glzdedaw5wzkkdzzmj",

  // "comdex1pem0egvc28cxa7ufhvxjdtvhhkshv4uasd6ea0",
  "cosmos1pa0waa4wvesx2y2skqwd6xgwgvraxll26qw5dd",
] as const;
describe.only("aaa", () => {
  test("test", async () => {
    // for (const address of richAccounts) {
    //   // for (const chain of Object.values(chains)) {
    //   //   if (chain.prefix === "evmos") continue;
    //   //   const address = replacePrefix(
    //   //     "cosmos1tq9mc4ayqd4lu6s36d89v9p5reecasgpkaunq5",
    //   //     chain.prefix
    //   //   );
    //   const chain = getChainByAddress(address);
    //   try {
    //     const response = await prepareIBCMsgTransfer({
    //       sender: address,
    //       receiver: "evmos1gxykhk5uffcrc7mqppftfrcxumqm6gz0lh8t5k",
    //       token: {
    //         amount: 1n,
    //         denom: chain.currencies[0].minCoinDenom,
    //       },
    //     });
    //     console.log("received", response);
    //     console.log("finished", address);
    //     console.log(address, response.estimatedGas);
    //   } catch (e) {
    //     console.log("finished", address);
    //     console.log(e);
    //     console.log(address, "failed");
    //   }
    // }
    const response = await prepareContractERC20Transfer({
      sender: "evmos1gxykhk5uffcrc7mqppftfrcxumqm6gz0lh8t5k",
      receiver: "evmos1gxykhk5uffcrc7mqppftfrcxumqm6gz0lh8t5k",
      token: {
        amount: 1000n,
        denom: "aevmos",
      },
    });

    const response2 = await prepareContractIBCTransfer({
      sender: "evmos1gxykhk5uffcrc7mqppftfrcxumqm6gz0lh8t5k",
      receiver: "cosmos1tq9mc4ayqd4lu6s36d89v9p5reecasgpkaunq5",
      token: {
        amount: 1000n,
        denom: "aevmos",
      },
    });
    console.log(response2);
  });
});
