import dynamic from "next/dynamic";
import { FunctionComponent } from "react";
import { TooltipProps } from "./types";
import { cn } from "helpers";
import { InfoIconOsmosis } from "icons";

const Tippy = dynamic(() => import("@tippyjs/react"), { ssr: false });

export const InfoTooltip: FunctionComponent<TooltipProps> = ({
  content,
  trigger,
}) => (
  <Tippy
    className="rounded-lg border border-osmoverse-600 bg-osmoverse-900 text-white text-sm p-2 md:p-1"
    content={content}
    trigger={trigger ?? "click"}
  >
    <div
      className={cn("flex cursor-pointer align-middle text-wosmongton-300")}
      onClick={(e) => e.stopPropagation()}
    >
      <InfoIconOsmosis />
    </div>
  </Tippy>
);
