export const PrimaryButton = ({
  onClick,
  text,
  className,
  icon,
  disabled,
}: {
  onClick: () => void;
  text: string;
  className?: string;
  icon?: JSX.Element;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red text-pearl hover:bg-red1 w-fit text-sm font-bold px-4 py-2 active:bg-red2 
     rounded-lg  shadow transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3
      ${className ? className : ""}
      ${disabled ? "disabled" : ""}
      `}
    >
      <span>{icon}</span> <p>{text}</p>
    </button>
  );
};
