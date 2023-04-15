import TopBarContainer from "../common/TopBarContainer";
import { Container } from "../common/topBar/Container";

import {
  amountToDollars,
  convertFromAtto,
} from "../../internal/common/helpers/style";
import { useHeaderInfo } from "../../internal/functionality/hooks/useHeaderInfo";
import useAssetsTopBar from "../../internal/functionality/hooks/useAssetsTopBar";

const TopBarMissionControl = () => {
  const { totalStaked, totalRewards } = useHeaderInfo();
  const { totalAssets, evmosPrice, totalEvmosAsset } = useAssetsTopBar();
  const totalEvmos = totalEvmosAsset.add(totalStaked);

  const totalAmountDollars = amountToDollars(
    totalStaked,
    18,
    Number(evmosPrice)
  );
  return (
    <TopBarContainer>
      <>
        <Container
          // it shows the total amount of ALL assets including
          // cosmosBalance and erc20Balance + total staked in dollars
          text="Total Assets"
          value={`$${(totalAssets + Number(totalAmountDollars)).toFixed(2)}`}
        />

        <Container
          // it shows the total amount of evmos + wevmos + stakedEvmos
          text="Total EVMOS"
          value={`${Number(convertFromAtto(totalEvmos)).toFixed(2)} EVMOS`}
        />

        <Container
          // it shows the total amount of delegations
          text="Total Staked"
          value={`
          ${Number(convertFromAtto(totalStaked)).toFixed(2)} EVMOS`}
          href="https://app.evmos.org/staking"
        />
        {/* displays the total rewards availables */}
        <Container
          text="Total Rewards Available"
          value={`${totalRewards.toFixed(2)} EVMOS`}
        />

        <Container text="EVMOS Price" value={evmosPrice} />
      </>
    </TopBarContainer>
  );
};

export default TopBarMissionControl;