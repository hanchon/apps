// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type DownloadIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const DownloadIcon: React.FC<DownloadIconProps> = ({
  width = "12",
  height = "15",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...restProps}
    >
      <path
        d="M1 14.334H11"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.99967 1V11M5.99967 11L8.91634 8.08333M5.99967 11L3.08301 8.08333"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
