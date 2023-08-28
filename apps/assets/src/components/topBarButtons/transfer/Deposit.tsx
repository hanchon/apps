// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ErrorContainer, Input, Subtitle, WizardHelper } from "ui-helpers";

export const Deposit = () => {
  // TODO: add logic for deposit
  return (
    <section className="space-y-3">
      <Subtitle>Account address of receipient </Subtitle>
      {/* TODO: add props */}
      <Input />
      <ErrorContainer
        text="Incompatible address"
        description="Deposit can only be made to evmos accounts."
      />

      <WizardHelper>
        <p>
          We prefilled the address of the recipient above with{" "}
          <b>the Evmos address that you are logged in with</b>. If you are
          depositing into a different address, you can make the changes
          accordingly.
        </p>
      </WizardHelper>
    </section>
  );
};
