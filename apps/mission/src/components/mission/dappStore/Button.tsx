export const Button = ({
  text,
  handleOnClick,
}: {
  text: string;
  handleOnClick: () => void;
}) => {
  return (
    <button
      className="rounded bg-[#423D37] px-5 py-3 text-sm font-bold text-pearl"
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
};
