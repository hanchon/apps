import { ComponentProps } from "react";

export const Description = ({ ...rest }: ComponentProps<"h2">) => {
  return <h2 className="text-gray1 text-sm space-y-2" {...rest} />;
};
