// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type ErrorProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const ErrorIcon: React.FC<ErrorProps> = ({
  width = "16",
  height = "16",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
      color={color}
    >
      <circle
        cx="8"
        cy="8"
        r="7.375"
        stroke="currentColor"
        stroke-width="1.25"
      />
      <path
        d="M8 4V9"
        stroke="currentColor"
        stroke-width="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.5" r="1" fill="currentColor" />
    </svg>
  );
};
