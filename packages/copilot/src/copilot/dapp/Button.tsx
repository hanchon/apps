import { Copilot } from "../Copilot";

export const Button = ({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <>
      <Copilot />
      <button
        onClick={onClick}
        className={` w-fit rounded p-3 text-sm font-bold ${
          className !== undefined ? className : "text-red bg-pearl"
        } }`}
      >
        {text}
      </button>
    </>
  );
};
