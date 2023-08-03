import Link from "next/link";
import { LaunchPadItemsProps } from "./data";

export const Item = ({ itemProps }: { itemProps: LaunchPadItemsProps }) => {
  return (
    <Link
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
