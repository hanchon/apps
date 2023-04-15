type CoinsProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

const Coins: React.FC<CoinsProps> = ({
  width = "125",
  height = "125",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 125 125"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M38.0562 93.3016V97.4415C38.0562 103.251 50.4327 107.962 65.6928 107.962C69.4615 107.962 73.0303 107.677 76.2993 107.163C86.3204 105.564 93.3438 101.824 93.3438 97.4415V93.2874C88.219 98.1694 76.9131 100.682 65.6928 100.682C54.4869 100.682 43.181 98.1694 38.0562 93.3016Z" />
      <path d="M47.6919 81.182C46.9639 80.9821 46.2501 80.768 45.5649 80.5396V83.6516C45.5649 89.4616 57.9415 94.1724 73.2016 94.1724C76.9703 94.1724 80.539 93.8868 83.808 93.373C93.8292 91.7742 100.853 88.0341 100.853 83.6516V79.4976C95.7278 84.3796 84.4219 86.8921 73.2016 86.8921C63.3518 86.8921 53.4306 84.9507 47.6919 81.182Z" />
      <path d="M75.7001 82.4241C72.1742 82.9809 68.4484 83.2663 64.6369 83.2663C63.966 83.2663 63.2808 83.2521 62.6099 83.2378C65.8646 83.7517 69.4476 84.0372 73.202 84.0372C88.4621 84.0372 100.839 79.3265 100.839 73.5165C100.839 71.104 98.7117 68.877 95.1429 67.1069V69.8905C95.1429 75.8004 87.8769 80.4827 75.7001 82.4241Z" />
      <path d="M64.6406 80.4062C68.4092 80.4062 71.978 80.1207 75.2471 79.6068C85.2682 78.0079 92.2916 74.2678 92.2916 69.8854V65.7313C87.1668 70.6134 75.8609 73.1258 64.6406 73.1258C53.4346 73.1258 42.1287 70.6134 37.0039 65.7456V69.8854C37.0039 75.6953 49.3804 80.4062 64.6406 80.4062Z" />
      <path d="M64.6367 70.2616C78.5549 70.2616 90.075 66.3502 92.0022 61.254C90.0036 61.8393 87.8053 62.3246 85.407 62.7101C81.8811 63.2668 78.1553 63.5381 74.3437 63.5381C60.6967 63.5381 46.8784 59.7979 44.2803 52.6318C39.7694 54.5019 37 56.9857 37 59.7408C37 65.5508 49.3765 70.2616 64.6367 70.2616Z" />
      <path d="M74.3491 53.4057C63.1431 53.4057 51.8372 50.8933 46.7124 46.0255V50.1653C46.7124 55.9753 59.0889 60.6861 74.3491 60.6861C78.1177 60.6861 81.6865 60.4006 84.9556 59.8867C94.9767 58.2878 102 54.5477 102 50.1653V46.0112C96.8753 50.8933 85.5694 53.4057 74.3491 53.4057Z" />
      <path d="M74.3501 50.5475C89.6162 50.5475 101.992 45.8359 101.992 40.0238C101.992 34.2116 89.6162 29.5 74.3501 29.5C59.0841 29.5 46.7085 34.2116 46.7085 40.0238C46.7085 45.8359 59.0841 50.5475 74.3501 50.5475Z" />
      <path d="M38.0991 87.3061C38.0991 93.1161 50.4756 97.8269 65.7358 97.8269C69.7471 97.8269 73.5728 97.4986 77.0132 96.9132C75.757 96.9989 74.4864 97.0275 73.2016 97.0275C58.0557 97.0275 42.71 92.4309 42.71 83.6517V81.4961C39.7979 83.1521 38.0991 85.1648 38.0991 87.3061Z" />
      <path
        d="M41.9999 44.5C37.9999 36.1 46.3333 29 50.9999 26.5L38 18L41.9999 29L28 26L36.5 33L5 36L36.5 41L31 48L41.9999 44.5Z"
        fill="#AAA4A0"
      />
    </svg>
  );
};

export default Coins;