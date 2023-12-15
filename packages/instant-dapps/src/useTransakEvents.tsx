// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect } from "react";
import {
  CANCELLED_ORDER_ON_TRANSAK,
  CREATED_ORDER_ON_TRANSAK,
  FAILED_ORDER_ON_TRANSAK,
  SUCCESSFUL_ORDER_ON_TRANSAK,
  sendEvent,
} from "tracker";

type transakParams = {
  event_id?: string;
  data: {
    onRampType: string;
    cryptoAmount: number;
    isBuyOrSell: string;
  };
};

const TRANSAK_EVENTS = {
  TRANSAK_ORDER_FAILED: "TRANSAK_ORDER_FAILED",
  TRANSAK_ORDER_SUCCESSFUL: "TRANSAK_ORDER_SUCCESSFUL",
  TRANSAK_ORDER_CANCELLED: "TRANSAK_ORDER_CANCELLED",
  TRANSAK_ORDER_CREATED: "TRANSAK_ORDER_CREATED",
};
export const useTransakEvents = () => {
  useEffect(() => {
    const handleMessage = ({ data }: { data: transakParams }) => {
      const eventId = data?.event_id;
      if (eventId) {
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_CREATED) {
          sendEvent(CREATED_ORDER_ON_TRANSAK);
        }
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_SUCCESSFUL) {
          sendEvent(SUCCESSFUL_ORDER_ON_TRANSAK);
        }
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_FAILED) {
          sendEvent(FAILED_ORDER_ON_TRANSAK);
        }
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_CANCELLED) {
          sendEvent(CANCELLED_ORDER_ON_TRANSAK);
        }
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return {};
};
