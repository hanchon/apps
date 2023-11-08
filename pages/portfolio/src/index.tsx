import AssetsTable from "./asset/table/AssetsTable";
import { TransferModal } from "./modals/transfer/TransferModal";
import { RequestModal } from "./modals/request/RequestModal";

export const PortfolioPage = () => {
  return (
    <>
      <AssetsTable />
      <TransferModal />
      <RequestModal />
    </>
  );
};
