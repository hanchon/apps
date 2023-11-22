import { cn } from "helpers";
import { ComponentProps } from "react";

export const EcosystemCardGrid = ({
  className,
  ...rest
}: ComponentProps<"section">) => {
  return (
    <section
      className={cn(
        "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
      {...rest}
    />
  );
};
