import { ComponentProps } from "react";

const GrayButton = ({
  className,
  ...props
}: ComponentProps<"button"> & { className?: string }) => {
  return (
    <button
      className={`${
        className ? className : "bg-[#E1DDD7] hover:bg-[#b9b5af]"
      } w-full rounded-2xl  px-8 py-2 font-bold transition-all  duration-200`}
      {...props}
    />
  );
};
export default GrayButton;
