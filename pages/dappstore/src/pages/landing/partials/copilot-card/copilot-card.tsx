"use client";
import { useCosmosQuery } from "@evmosapps/evmos-wallet/src/api/cosmos-clients/client";
import { useAccount } from "wagmi";
import { normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { cn } from "helpers";
import { ComponentProps } from "react";

import { SetupAccountModalTrigger } from "stateful-components/src/modals/SetupAccountModal/SetupAccountModal";
import { Link, useTranslation } from "@evmosapps/i18n/client";

import { CLICK_ON_COPILOT_BANNER } from "tracker";
import { Frameline } from "@evmosapps/ui-helpers/src/container/FrameLine";
import { TrackerEvent } from "@evmosapps/ui-helpers/src/TrackerEvent";
export const CopilotCard = () => {
  const { address, isConnected } = useAccount();
  const { t } = useTranslation("dappStore");

  return (
    <div className="text-pearl flex flex-col justify-start space-y-3 rounded-lg bg-[url(/galaxy-1.png)] bg-cover bg-center bg-no-repeat p-6">
      asdasdasd
    </div>
  );
};
