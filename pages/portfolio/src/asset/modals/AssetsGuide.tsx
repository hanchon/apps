// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { CLICK_CTA_LINKS_ASSETS_GUIDE, useTracker } from "tracker";
import { Modal } from "@evmosapps/ui-helpers";

const AssetsGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handlePreClickAction } = useTracker(CLICK_CTA_LINKS_ASSETS_GUIDE);
  const modalContent = (
    <div className="space-y-5">
      <h5 className="text-2xl font-bold">Asset Guides</h5>
      <p>
        Reference guide on the Evmos Assets Page can be found{" "}
        <a
          href="https://medium.com/evmos/assets-page-quick-reference-guide-f1cd09e7cb85"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-red-300">here</span>
        </a>
        .
      </p>
      Axelar-based assets workflow can be found{" "}
      <a // eslint-disable-next-line no-secrets/no-secrets
        href="https://www.notion.so/How-to-Deposit-or-Withdraw-Axelar-Assets-on-the-Evmos-Assets-Page-2ef683c3bec745eda4cc1b894ce165b8"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="text-red-300">here</span>
      </a>
      .
    </div>
  );
  return (
    <>
      <span
        onClick={() => {
          setIsOpen(true);
          handlePreClickAction();
        }}
        className="cursor-pointer text-red-300"
      >
        view the assets guide
      </span>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Body className="bg-pearl">{modalContent}</Modal.Body>
      </Modal>
    </>
  );
};

export default AssetsGuide;
