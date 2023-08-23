import { ComponentProps } from "react";

export const Title = ({ ...rest }: ComponentProps<"h1">) => {
  return <h1 className="font-bold" {...rest} />;
};
