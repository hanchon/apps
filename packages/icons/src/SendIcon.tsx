// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type SendIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const SendIcon: React.FC<SendIconProps> = ({
  width = "24",
  height = "24",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_264_3121)">
        <path
          d="M20.5 4H3.5C2.83717 4.0007 2.20169 4.26431 1.733 4.733C1.26431 5.20169 1.0007 5.83717 1 6.5V15.5C1.0007 16.1628 1.26431 16.7983 1.733 17.267C2.20169 17.7357 2.83717 17.9993 3.5 18H11.5C11.6326 18 11.7598 17.9473 11.8536 17.8536C11.9473 17.7598 12 17.6326 12 17.5C12 17.3674 11.9473 17.2402 11.8536 17.1464C11.7598 17.0527 11.6326 17 11.5 17H3.5C3.10231 16.9996 2.72103 16.8414 2.43982 16.5602C2.15861 16.279 2.00043 15.8977 2 15.5V9H22V12.5C22 12.6326 22.0527 12.7598 22.1464 12.8536C22.2402 12.9473 22.3674 13 22.5 13C22.6326 13 22.7598 12.9473 22.8536 12.8536C22.9473 12.7598 23 12.6326 23 12.5V6.5C22.9993 5.83717 22.7357 5.20169 22.267 4.733C21.7983 4.26431 21.1628 4.0007 20.5 4ZM2 8V6.5C2.00043 6.10231 2.15861 5.72103 2.43982 5.43982C2.72103 5.15861 3.10231 5.00043 3.5 5H20.5C20.8977 5.00043 21.279 5.15861 21.5602 5.43982C21.8414 5.72103 21.9996 6.10231 22 6.5V8H2Z"
          fill="currentColor"
        />
        <path
          d="M14.2002 17.5132C14.2002 17.4344 14.2156 17.3563 14.2458 17.2835C14.2759 17.2107 14.3201 17.1445 14.3758 17.0888C14.4316 17.0331 14.4977 16.9889 14.5705 16.9588C14.6433 16.9286 14.7214 16.9131 14.8002 16.9132L21.7518 16.9132L20.376 15.5374C20.3187 15.4821 20.273 15.4159 20.2415 15.3427C20.2101 15.2695 20.1935 15.1907 20.1928 15.1111C20.1921 15.0314 20.2073 14.9524 20.2375 14.8787C20.2677 14.8049 20.3122 14.7379 20.3685 14.6816C20.4249 14.6253 20.4919 14.5807 20.5656 14.5505C20.6393 14.5204 20.7184 14.5052 20.798 14.5059C20.8777 14.5066 20.9564 14.5231 21.0296 14.5546C21.1028 14.586 21.169 14.6317 21.2244 14.689L23.6236 17.0883C23.7361 17.2011 23.7993 17.3539 23.7993 17.5132C23.7993 17.6726 23.7361 17.8254 23.6236 17.9382L21.2244 20.3374C21.1112 20.4467 20.9597 20.5072 20.8023 20.5058C20.645 20.5045 20.4945 20.4414 20.3833 20.3301C20.272 20.2189 20.2089 20.0684 20.2076 19.9111C20.2062 19.7538 20.2667 19.6022 20.376 19.489L21.7518 18.1132L14.8002 18.1132C14.7214 18.1132 14.6433 18.0977 14.5705 18.0676C14.4977 18.0375 14.4316 17.9933 14.3758 17.9375C14.3201 17.8818 14.2759 17.8157 14.2458 17.7428C14.2156 17.67 14.2002 17.592 14.2002 17.5132Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_264_3121">
          <rect width="24" height="24" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};