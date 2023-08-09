// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type TransakIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const TransakIcon: React.FC<TransakIconProps> = ({
  width = "34",
  height = "34",
  ...restProps
}) => {
  return (
    <svg
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="24" fill="url(#patternTransak)" />
      <defs>
        <pattern
          id="patternTransak"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#image0_39_455"
            transform="matrix(0.02 0 0 0.0183333 0 -0.00416667)"
          />
        </pattern>
        <image
          id="image0_39_455"
          width="50"
          height="55"
          // eslint-disable-next-line no-secrets/no-secrets
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
