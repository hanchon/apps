// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type EvmosRedIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const EvmosRedIcon: React.FC<EvmosRedIconProps> = ({
  width = "40",
  height = "40",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...restProps}
    >
      <g clipPath="url(#a)">
        <path fill="#ED4E33" d="M20 40a20 20 0 1 0 0-40 20 20 0 0 0 0 40Z" />
        <path
          fill="#fff"
          d="M16 11c-5 2-6 7-7 10-2 2-5 3-5 5l7 1c3 0 7 4 12 2 3-1 5-3 6-6v-1l-1 1a8 8 0 0 1-14-2 88 88 0 0 1 14-5h1v2h1l2-1 3-3-4-1a43 43 0 0 0-7 2 92 92 0 0 0-10 4 8 8 0 0 1 10-7h1l-1-1h-8Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
