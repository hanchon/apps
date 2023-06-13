// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/router";
import { Header } from "./header/Header";
import { Navigation } from "ui-helpers";
import { NAV_TO_VESTING } from "constants-helper";
import { AccountDetails } from "./content/AccountDetails";
import { ethToEvmos } from "@evmos/address-converter";

interface RouterQuery {
  account?: string;
}
const Content = () => {
  const router = useRouter();
  const { account }: RouterQuery = router.query;

  // TODO: use it with the right information - use the useProposals as example
  const dummyProps = [
    {
      // eslint-disable-next-line no-secrets/no-secrets
      accountAddress: "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak",
      // eslint-disable-next-line no-secrets/no-secrets
      funderAddress: "evmos1cnr73vd4xcjm83xs8275twu06w3xqr6n7g5cud",
      isVesting: true,
    },
    {
      accountAddress: "0xaF3219826Cb708463B3AA3B73c6640A21497AE49",
      // eslint-disable-next-line no-secrets/no-secrets
      funderAddress: "testingFunder",
      isVesting: true,
    },
  ];

  const getEvmosAddress = (account: string | undefined) => {
    if (account !== undefined) {
      if (account.startsWith("0x") && account.length == 42) {
        //
        return ethToEvmos(account);
      }
    }
    return account;
  };

  const getData = (account: string | undefined) => {
    const address = getEvmosAddress(account);

    const filteredProps = dummyProps.filter((e) => {
      if (e.accountAddress.startsWith("0x")) {
        return ethToEvmos(e.accountAddress) === address;
      }
      if (e.accountAddress.startsWith("evmos")) {
        return e.accountAddress === address;
      }
      return false;
    });

    return filteredProps;
  };

  return (
    <>
      {account !== undefined && <Navigation href="/" text={NAV_TO_VESTING} />}
      <Header />

      <div className="mt-8 w-full font-[IBM] text-pearl">
        {account === undefined ? (
          <p className="flex justify-center ">
            A list of your vesting accounts will appear here in the next version
          </p>
        ) : (
          <AccountDetails props={getData(account)[0]} />
        )}
      </div>
    </>
  );
};

export default Content;
