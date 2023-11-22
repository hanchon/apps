"use client";
import { TermsOfServicesModalController } from "./TermsOfServiceController";
import dynamic from "next/dynamic";

const TermsOfServiceContent = dynamic(
  () =>
    import("./TermsOfServiceContent").then((mod) => mod.TermsOfServiceContent),
  {
    ssr: false,
  }
);
export const TermsOfServiceModal = () => {
  return (
    <TermsOfServicesModalController>
      {/* Can't use this while Netlify doesn't fix RSC */}
      {/* <NotionBlocks id={TERMS_OF_SERVICE_PAGE_NOTION_ID} /> */}
      <TermsOfServiceContent />
    </TermsOfServicesModalController>
  );
};
