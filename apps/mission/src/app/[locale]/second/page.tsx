import React from "react";
import { NotionBlocks, NotionPage } from "../../../components/NotionBlocks";

async function Page() {
  return (
    <>
      <div className="container mx-auto mb-auto  text-white">
        <div className="prose dark:prose-invert">
          <NotionPage blockId="e0784623-c623-4d4f-80a8-4ed6da9aaa4c" />
        </div>
      </div>
    </>
  );
}

export default Page;
