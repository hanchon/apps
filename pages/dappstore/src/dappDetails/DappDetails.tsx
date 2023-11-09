export const DappDetails = ({
  params,
}: {
  params: {
    dapp: string;
  };
}) => {
  return (
    <div>
      <h1>DappDetails</h1>
      <p>{params.dapp}</p>
    </div>
  );
};
