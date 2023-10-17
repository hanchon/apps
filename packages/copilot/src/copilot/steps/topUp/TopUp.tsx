// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { Intro } from "./Intro";
import Transak from "./Transak";
import Onboard from "./Onboard";
import ProviderDropwdown, {
  DropdownOption,
  dropdownOptions,
} from "./ProviderDropdown";
import C14 from "./C14";
import CypherD from "./CypherD";

export const TopUp = () => {
  const [topUpType, setTopUpType] = useState("intro");
  const [cardProvider, setCardProvider] = useState<DropdownOption>(
    dropdownOptions[0]
  );

  function renderScreen() {
    if (topUpType === "intro") {
      return <Intro setTopUpType={setTopUpType} />;
    } else if (topUpType === "card") {
      return (
        <Onboard setTopUpType={setTopUpType} topUpType={topUpType}>
          <>
            <ProviderDropwdown
              selectedValue={cardProvider}
              setProvider={setCardProvider}
            />
            {cardProvider.value === "Transak" ? <Transak /> : <C14 />}
          </>
        </Onboard>
      );
    } else if (topUpType === "crypto") {
      return (
        <Onboard setTopUpType={setTopUpType} topUpType={topUpType}>
          <CypherD />
        </Onboard>
      );
    }
  }

  return <section className="space-y-3">{renderScreen()}</section>;
};
