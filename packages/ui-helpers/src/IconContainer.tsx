import { CheckIcon, CloseBorderIcon } from "icons";
import { ComponentProps } from "react";
import { CONFETTI, HANDS, ICONS_TYPES } from "constants-helper";

const BIG_ICONS_STYLE =
  "border-lightYellow2 bg-lightYellow2 mb-4 h-56 w-56 border text-9xl";

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
  [ICONS_TYPES.BIG_CONFETTI]: {
    style: BIG_ICONS_STYLE,
    icon: CONFETTI,
  },
  [ICONS_TYPES.BIG_HANDS]: {
    style: BIG_ICONS_STYLE,
    icon: HANDS,
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
