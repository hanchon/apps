import React from "react";
import { NotionBlocks, NotionPage } from "../../../components/NotionBlocks";

async function Page() {
  return <TermsOfServiceContent />;
}

const TermsOfServiceContent = () => {
  return (
    <NotionPage
      className="mx-auto"
      blockId="8f2d02c7ba924e4a88d502f8e220e557"
    />
  );
};
export default Page;
