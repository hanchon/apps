import { CheckIcon, CloseBorderIcon } from "icons";
import { ComponentProps } from "react";
import { CONFETTI, ICONS_TYPES } from "constants-helper";

const ICONS_STYLES = {
  [ICONS_TYPES.CHECK]: {
    style: "bg-red text-pearl flex h-4 w-4",
    icon: <CheckIcon width={"14px"} height={"14px"} color="#fff" />,
  },
  [ICONS_TYPES.CANCEL]: {
    style: "border-pink bg-pink h-7 w-7",
    icon: <CloseBorderIcon width={"14px"} height={"14px"} color="#fff" />,
  },
  [ICONS_TYPES.CONFETTI]: {
    style:
      "border-lightYellow3 bg-lightYellow3 relative top-1 h-5 w-5  border p-4",
    icon: CONFETTI,
  },
};

export const IconContainer = ({
  type,
  ...rest
}: { type: string } & ComponentProps<"div">) => {
  return (
    <div
      className={`${ICONS_STYLES[type].style} flex items-center justify-center rounded-full`}
      {...rest}
    >
      {ICONS_STYLES[type].icon}
    </div>
  );
};
