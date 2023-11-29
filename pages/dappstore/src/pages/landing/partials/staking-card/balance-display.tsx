// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const BalanceDisplay = ({
  title,
  amount,
  amountInDollars,
  ...rest
}: {
  title: string;
  amount: string;
  amountInDollars: string;
}) => {
  return (
    <div {...rest} className="space-y-2">
      <h3 className="font-light text-base text-pearl">{title}</h3>
      <h4 className="text-lg text-white md:text-3xl">
        {amount} <span className="opacity-50">EVMOS</span>
      </h4>
      <h5 className="text-sm text-white opacity-50 md:text-base">
        ${amountInDollars}
      </h5>
    </div>
  );
};
