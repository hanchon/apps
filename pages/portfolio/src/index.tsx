import AssetsTable from "./asset/table/AssetsTable";
import { TransferModal } from "./modals/transfer/TransferModal";
import { RequestModal } from "./modals/request/RequestModal";
import { PayModal } from "./modals/pay/Modal";
import { Suspense } from "react";
import { ReceiptModal } from "./modals/receipt/ReceiptModal";
import { ConvertModal } from "./modals/convert/ConvertModal";
const PortfolioSummary = async () => {
  return (
    <div className="grid bg-darkGray2 text-pearl rounded-2xl p-4 text-center gap-y-6 md:grid-cols-3">
      <div>
        <h3 className="text-xs font-normal opacity-80">Total Assets</h3>
        <p className="font-body text-xl font-bold flex justify-center">$7.74</p>
      </div>
      <div>
        <h3 className="text-xs font-normal opacity-80">EvmosPrice</h3>
        <p className="font-body text-xl font-bold flex justify-center">$7.74</p>
      </div>
      <div>
        <h3 className="text-xs font-normal opacity-80">EvmosPrice</h3>
        <p className="font-body text-xl font-bold flex justify-center">$7.74</p>
      </div>
    </div>
  );
};
export const PortfolioPage = () => {
  return (
    <>
      <PortfolioSummary />
      <AssetsTable />
      <Suspense>
        <TransferModal />
        <RequestModal />
        <PayModal />
        <ReceiptModal />
        <ConvertModal />
      </Suspense>
    </>
  );
};
