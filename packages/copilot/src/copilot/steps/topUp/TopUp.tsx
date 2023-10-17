// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { Intro } from "./Intro";
import Transak from "./Transak";
import Onboard from "./Onboard";
import C14 from "./C14";
import CypherD from "./CypherD";
import LayerSwap from "./LayerSwap";
import { CLICK_ON_DIFFERENT_ON_RAMP, useTracker } from "tracker";
import ProviderDropwdown from "./ProviderDropdown";
import { providerOptions, DropdownOption } from "./utils";

export const TopUp = () => {
  const [topUpType, setTopUpType] = useState("intro");
  const [cardProvider, setCardProvider] = useState<DropdownOption>(
    providerOptions.card[0]
  );
  const [cryptoProvider, setCryptoProvider] = useState<DropdownOption>(
    providerOptions.crypto[0]
  );

  const { handlePreClickAction: handleDifferentOnRampClick } = useTracker(
    CLICK_ON_DIFFERENT_ON_RAMP
  );

  const onItemClick = (option: DropdownOption) => {
    handleDifferentOnRampClick({ onRampType: option.value });
    setCardProvider(option);
  };

  const onCryptoItemClick = (option: DropdownOption) => {
    handleDifferentOnRampClick({ onRampType: option.value });
    setCryptoProvider(option);
  };

  function renderScreen() {
    if (topUpType === "intro") {
      return <Intro setTopUpType={setTopUpType} />;
    } else if (topUpType === "card") {
      return (
        <Onboard setTopUpType={setTopUpType} topUpType={topUpType}>
          <>
            <ProviderDropwdown
              selectedValue={cardProvider}
              onItemClick={onItemClick}
              dropdownOptions={providerOptions.card}
            />
            {cardProvider.value === "Transak" ? <Transak /> : <C14 />}
          </>
        </Onboard>
      );
    } else if (topUpType === "crypto") {
      return (
        <Onboard setTopUpType={setTopUpType} topUpType={topUpType}>
          <>
            <ProviderDropwdown
              selectedValue={cryptoProvider}
              onItemClick={onCryptoItemClick}
              dropdownOptions={providerOptions.crypto}
            />
            {cryptoProvider.value === "Cypher" ? <CypherD /> : <LayerSwap />}
          </>
        </Onboard>
      );
    }
  }

  return <section className="space-y-3">{renderScreen()}</section>;
};
