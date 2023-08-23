// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type RequestIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const RequestIcon: React.FC<RequestIconProps> = ({
  width = "15",
  height = "15",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M12.1918 1V4.9501M12.1918 4.9501L14.1669 2.97505M12.1918 4.9501L10.2168 2.97505"
        stroke="#FAF1E4"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.24185 1.03251C8.02531 1.01101 7.80569 1 7.5835 1C3.94753 1 1 3.94753 1 7.5835C1 8.78261 1.3206 9.90688 1.88075 10.8752L1.32917 13.8378L4.29175 13.2863C5.26009 13.8464 6.38438 14.167 7.5835 14.167C11.2194 14.167 14.167 11.2194 14.167 7.5835C14.167 7.3613 14.156 7.14168 14.1345 6.92515"
        stroke="#FAF1E4"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
