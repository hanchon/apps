// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type InfoIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const OsmosisInfoIcon: React.FC<InfoIconProps> = ({ ...restProps }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect x="0.5" width="16" height="16" rx="8" fill="#565081" />
      <circle cx="8.5" cy="4" r="1" fill="#090524" />
      <rect x="7.5" y="6" width="2" height="6" fill="#090524" />
    </svg>
  );
};
