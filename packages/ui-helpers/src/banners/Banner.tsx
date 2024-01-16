import { ComponentProps } from "react";

export const Banner = ({ ...rest }: ComponentProps<"section">) => {
  return (
    <section
      className="bg-red-300 px-4 py-2 text-red-white font-bold rounded-lg mb-5"
      {...rest}
    ></section>
  );
};
