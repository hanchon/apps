// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Description } from "./Description";

export const RowContent = ({
  symbol,
  imgSrc,
  valueInTokens,
  valueInDollars,
}: {
  symbol: string;
  imgSrc: string;
  valueInTokens: string;
  valueInDollars: string;
}) => {
  return (
    <div className="mr-8 flex w-full justify-between lg:mr-0">
      <Description symbol={symbol} imageSrc={imgSrc} description={""} />
      <div className="flex w-full flex-col items-end uppercase lg:w-[50%] lg:items-start">
        <span className="text-xs font-bold">{valueInTokens}</span>
        <span className="text-xxs text-darkGray5">${valueInDollars}</span>
      </div>
    </div>
  );
};
