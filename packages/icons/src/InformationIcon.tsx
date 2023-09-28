// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type InformationIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const InformationIcon: React.FC<InformationIconProps> = ({
  width = "11",
  height = "11",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M5.5 5.275V7.525M5.5 3.4795L5.5045 3.4745M5.5 10C7.98526 10 10 7.98526 10 5.5C10 3.01472 7.98526 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98526 3.01472 10 5.5 10Z"
        stroke="#413836"
        strokeOpacity="0.22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
