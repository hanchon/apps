// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const BalanceContainer = ({
  title,
  amount,
  amountInDollars,
}: {
  title: string;
  amount: string;
  amountInDollars: string;
}) => {
  return (
    <div>
      <h3 className="font-semibold text-pearl">{title}</h3>
      <h4 className="text-3xl text-white">
        {amount} <span className="opacity-50">EVMOS</span>
      </h4>
      <h5 className="text-white opacity-50">${amountInDollars}</h5>
    </div>
  );
};
