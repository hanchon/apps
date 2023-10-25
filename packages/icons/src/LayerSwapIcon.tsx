// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type LayerSwapIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const LayerSwapIcon: React.FC<LayerSwapIconProps> = ({
  width = "77",
  height = "77",
  ...restProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 77 77"
      fill="none"
    >
      <path
        opacity="0.6"
        d="M10.2783 15.5145C10.2783 12.6226 12.6226 10.2783 15.5145 10.2783H60.6763C63.5682 10.2783 65.9125 12.6226 65.9125 15.5145V60.6763C65.9125 63.5682 63.5682 65.9125 60.6763 65.9125H15.5145C12.6226 65.9125 10.2783 63.5682 10.2783 60.6763V15.5145Z"
        fill="#FF0093"
      ></path>
      <path
        opacity="0.5"
        d="M20.5557 25.7913C20.5557 22.8995 22.9 20.5552 25.7918 20.5552H70.9537C73.8455 20.5552 76.1898 22.8995 76.1898 25.7913V70.9532C76.1898 73.845 73.8455 76.1893 70.9537 76.1893H25.7918C22.9 76.1893 20.5557 73.845 20.5557 70.9532V25.7913Z"
        fill="#FF0093"
      ></path>
      <path
        opacity="0.9"
        d="M0 5.23616C0 2.34431 2.34431 0 5.23616 0H50.398C53.2899 0 55.6342 2.34431 55.6342 5.23616V50.398C55.6342 53.2899 53.2899 55.6342 50.398 55.6342H5.23616C2.34431 55.6342 0 53.2899 0 50.398V5.23616Z"
        fill="#FF0093"
      ></path>
    </svg>
  );
};
