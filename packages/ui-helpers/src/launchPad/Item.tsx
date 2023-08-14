import Link from "next/link";
import { LaunchPadItemsProps } from "./data";
import { CLICK_ON_DAPP_INSIDE_LAUNCHER, useTracker } from "tracker";

export const Item = ({ itemProps }: { itemProps: LaunchPadItemsProps }) => {
  const { handlePreClickAction } = useTracker(CLICK_ON_DAPP_INSIDE_LAUNCHER);

  const handleOnClick = () => {
    handlePreClickAction({ dApp: itemProps.text });
  };
  return (
    <Link
      onClick={handleOnClick}
      href={itemProps.href}
      rel="noopener noreferrer"
      className="text-pearl flex flex-col items-center"
    >
      <div className="bg-red flex w-fit items-center justify-center rounded-lg p-2">
        {itemProps.icon}
      </div>
      <p className="text-sm">{itemProps.text}</p>
    </Link>
  );
};
