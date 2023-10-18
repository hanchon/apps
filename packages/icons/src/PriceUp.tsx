// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type PriceUpIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const PriceUp: React.FC<PriceUpIconProps> = ({
  width = "16",
  height = "16",
  ...restProps
}) => {
  return (
    <svg {...restProps} width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8149 14.0859V7.54297M10.8149 7.54297L13.2686 9.99658M10.8149 7.54297L8.36133 9.99658" stroke="#31B886" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1 9.17871L7.54297 2.63574L9.99658 5.08936L14.0859 1" stroke="#31B886" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

