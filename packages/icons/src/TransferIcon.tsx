// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type TransferIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const TransferIcon: React.FC<TransferIconProps> = ({
  width = "13",
  height = "13",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M1 9.9375L12 9.9375M12 9.9375L9.9375 12M12 9.9375L9.9375 7.875M12 3.0625L1 3.0625M1 3.0625L3.0625 5.125M1 3.0625L3.0625 1"
        stroke="#FAF1E4"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
