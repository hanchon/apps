// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type SwapIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const SwapIcon: React.FC<SwapIconProps> = ({ ...restProps }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 19 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M6.125 1.93748L6.125 19.375L1.625 15.325"
        stroke="#C7BFDA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12.875 21.6249L12.875 4.18741L17.375 8.23741"
        stroke="#C7BFDA"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
