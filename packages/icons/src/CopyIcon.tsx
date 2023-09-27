// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CopyIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const CopyIcon: React.FC<CopyIconProps> = ({
  width = "12",
  height = "12",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...restProps}
    >
      <path
        d="M7.875 4.125V1.375C7.875 1.16789 7.70712 1 7.5 1H1.375C1.16789 1 1 1.16789 1 1.375V7.5C1 7.70712 1.16789 7.875 1.375 7.875H4.125M10.625 11H4.5C4.29289 11 4.125 10.8321 4.125 10.625V4.5C4.125 4.29289 4.29289 4.125 4.5 4.125H10.625C10.8321 4.125 11 4.29289 11 4.5V10.625C11 10.8321 10.8321 11 10.625 11Z"
        stroke="#D1D5DB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
