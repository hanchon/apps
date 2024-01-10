// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type DownArrowIconOsmosisIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const OsmosisDownArrowIcon: React.FC<DownArrowIconOsmosisIconProps> = ({
  ...restProps
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M8 2V18"
        stroke="#8E83AA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 13L8 19L2 13"
        stroke="#8E83AA"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
