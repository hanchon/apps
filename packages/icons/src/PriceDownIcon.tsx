// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type PriceDownIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const PriceDownIcon: React.FC<PriceDownIconProps> = ({
  width = "16",
  height = "16",
  ...restProps
}) => {
  return (
    <svg
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.25L8 13.25L10.625 10.625L15 15"
        stroke="#ED4E33"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 1V8M11.5 8L14.125 5.375M11.5 8L8.875 5.375"
        stroke="#ED4E33"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
