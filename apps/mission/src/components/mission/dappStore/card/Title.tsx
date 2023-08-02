export const Title = ({
  firstWord,
  secondWord,
}: {
  firstWord: string;
  secondWord: string;
}) => {
  return (
    <h1 className="text-4xl font-bold text-[#FAF1E4]">
      {firstWord} <span className="text-red">{secondWord}</span>
    </h1>
  );
};
