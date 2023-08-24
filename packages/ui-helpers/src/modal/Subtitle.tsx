<h5 className="text-xs font-bold">Transfer Type</h5>;
import { ComponentProps } from "react";

export const Subtitle = ({ ...rest }: ComponentProps<"h5">) => {
  return <h5 className="text-darkGray900 text-xs font-bold" {...rest} />;
};
