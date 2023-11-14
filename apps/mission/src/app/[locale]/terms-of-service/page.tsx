import React from "react";
import { NotionBlocks, NotionPage } from "../../../components/NotionBlocks";
import { TERMS_OF_SERVICE_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";

async function Page() {
  return <TermsOfServiceContent />;
}

const TermsOfServiceContent = () => {
  return (
    <NotionPage className="mx-auto" blockId={TERMS_OF_SERVICE_PAGE_NOTION_ID} />
  );
};
export default Page;
