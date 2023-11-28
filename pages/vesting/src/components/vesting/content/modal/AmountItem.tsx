export const AmountItem = ({
  text,
  amount,
}: {
  text: string;
  amount: string;
}) => {
  return (
    <div className="space-y-2">
      <p className="smallText">{text}</p>
      {/* TODO: add correct value here */}
      <p className="text-2xl">{amount} EVMOS</p>
    </div>
  );
};
