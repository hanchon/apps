"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  Button,
  Stack,
  Text,
  Box,
  LiquidStaking,
  LiquidStakingProps,
  useTheme,
} from "@interchain-ui/react";

import { RiTimeLine, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import { useEffect, useState } from "react";
import useStrideData from "./useStrideData";
import { useAssets } from "@evmosapps/evmos-wallet";
import { convertFromAtto } from "helpers";
import { ConnectionRequired } from "@evmosapps/ui-helpers";
import { useAccount } from "wagmi";

const Stride = () => {
  const { themeClass, setTheme } = useTheme();

  const { evmosPrice, totalEvmosAsset } = useAssets();

  const { redemptionRate, strideYield } = useStrideData();
  const [evmosOption, setEvmosOption] = useState({
    available: 0,
    imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
    name: "Evmos",
    priceDisplayAmount: 0,
    symbol: "EVMOS",
  });

  useEffect(() => {
    setTheme("light");
  });

  useEffect(() => {
    setEvmosOption((prev) => {
      return {
        ...prev,
        available: totalEvmosAsset
          ? parseFloat(convertFromAtto(totalEvmosAsset))
          : 0,
        priceDisplayAmount: parseFloat(evmosPrice) ?? 0,
      };
    });
  }, [totalEvmosAsset, evmosPrice]);

  const [reward, setReward] = useState<LiquidStakingProps["reward"]>({
    imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stevmos.png",
    name: "Staked Evmos",
    priceDisplayAmount: 0,
    rewardAmount: 0,
    symbol: "stEVMOS",
  });

  const [stakedAmount, setStakedAmount] = useState<number>(0);

  const { isDisconnected } = useAccount();
  if (isDisconnected) {
    return (
      <ConnectionRequired
        bgUrl="bg-[url(/ecosystem/blur/stride-blur.png)]"
        dappName="Stride "
      />
    );
  }

  return (
    <div id="" className={`${themeClass}`}>
      <LiquidStaking
        stakeAmount={stakedAmount}
        precision={2}
        reward={reward}
        stakeToken={evmosOption}
        bottomLink={{
          href: "https://cosmology.tech/",
          label: "Learn more",
        }}
        // Not required if you use custom renderSubmitButton prop
        timeEstimateLabel="30 seconds"
        descriptionList={[
          {
            title: "Rewards",
            subtitle: `${(strideYield * 100).toFixed(2)}%`,
            desc: "Rewards on Stride are similar to native staking rewards. However, they accumulate in the background, which reflects in the price of the stToken continually appreciating compared to the native token, while you can still move the stToken around the ecosystem freely.",
          },
          {
            title: "Fees",
            subtitle: "Low",
            desc: "Strides 10% fee is only applied to rewards you earn. The tokens you stake (aka principal) and transactions are fee-free!",
          },
          {
            title: "Unbonding",
            subtitle: "14-17 days",
            desc: "Unstaking on Stride requires an unbonding period before you can withdraw your tokens. If you don't want to wait, you can sell stEVMOS directly on an exchange.",
          },
          {
            title: "Value of 1 stEVMOS",
            subtitle: `${
              redemptionRate ? redemptionRate?.toFixed(2) : 0
            } stEVMOS`,
            desc: "The value of 1 stEVMOS if redeemed through the Stride protocol redemption rate grows predictably as staking rewards accrue.",
          },
        ]}
        onChange={(payloadStakedAmount) => {
            if(isNaN(payloadStakedAmount)) {
              setStakedAmount(0);
              setReward((prevReward) => {
                return {
                  ...prevReward,
                  rewardAmount: 0,
                  priceDisplayAmount: 0,
                };
              });
              return
            }
            setStakedAmount(payloadStakedAmount);
            setReward((prevReward) => {
              // This is just mock reward calculation

              const ra = payloadStakedAmount / redemptionRate;
              const pda = parseFloat(evmosPrice ?? 0) * redemptionRate;
              return {
                ...prevReward,
                rewardAmount: ra,
                priceDisplayAmount: pda,
              };
            });
          
        }}
        footerLabel={
          <Stack
            direction="horizontal"
            space="$4"
            attributes={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text fontWeight="$normal" fontSize="$sm" color="#A7B4C2">
              Powered by
            </Text>
            <Box
              as="img"
              height="$8"
              width="auto"
              attributes={{
                src: "/ecosystem/stride-logo.png",
                alt: "Stride",
              }}
            />
          </Stack>
        }
        renderAccordionButton={({
          onClick,
          expanded,
        }: {
          onClick: () => void;
          expanded: boolean;
        }) => (
          <Button
            size="sm"
            intent={expanded ? "tertiary" : "secondary"}
            onClick={onClick}
          >
            {expanded ? (
              <RiArrowUpSLine color="inherit" size="14px" />
            ) : (
              <RiArrowDownSLine color="inherit" size="14px" />
            )}
          </Button>
        )}
        renderSubmitButton={() => (
          <Button
            // onClick={(event) => {
            //   handleSubmit();
            // }}
            intent="tertiary"
            size="lg"
            attributes={{ width: "$full" }}
          >
            <Box as="span" mr="$2">
              Stake
            </Box>

            <Box mr="$4">
              <RiTimeLine color="inherit" />
            </Box>

            <Text fontSize="$sm" fontWeight="$normal" as="span" color="inherit">
              ≈ &nbsp; 30 seconds
            </Text>
          </Button>
        )}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default Stride;
