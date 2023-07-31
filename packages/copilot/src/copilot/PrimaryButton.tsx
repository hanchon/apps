export const PrimaryButton = ({
  onClick,
  text,
  className,
}: {
  onClick: () => void;
  text: string;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-auto space-x-2 rounded-lg bg-red
    px-8 py-2 font-normal  normal-case text-pearl shadow transition-all duration-300 hover:bg-red1 hover:shadow-md 
    ${className ? className : "ml-4"}`}
    >
      {text}
    </button>
  );
};
