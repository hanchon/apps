import { ComponentProps } from "react";

export const Title = ({ className, ...rest }: ComponentProps<"h1">) => {
  return <h1 className={`${className ?? ""} font-bold`} {...rest} />;
};
