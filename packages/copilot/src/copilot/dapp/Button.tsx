import { Copilot } from "../Copilot";

export const Button = ({
  text,
  className,
  onClick,
  status,
}: {
  text: string;
  className?: string;
  onClick: () => void;
  status?: string;
}) => {
  return (
    <>
      <Copilot />
      {status === "current" && (
        <button
          onClick={onClick}
          className={` w-fit rounded p-3 text-sm font-bold ${
            className !== undefined ? className : "text-red bg-pearl"
          } }`}
        >
          {text}
        </button>
      )}
    </>
  );
};
