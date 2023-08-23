// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type RightArrowIcon = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const RightArrowIcon: React.FC<RightArrowIcon> = ({
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
        d="M1 6.23219H11.9004M11.9004 6.23219L6.6682 1M11.9004 6.23219L6.6682 11.4644"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
