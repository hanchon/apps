import { useCallback, useEffect, useMemo, useState } from "react";
import { StepsContainerDapp } from "./StepsContainarDapp";
import { StoreType, useEvmosBalance } from "evmos-wallet";
import { useSelector } from "react-redux";
import { steps } from "../container/data";

export const useCopilotCard = () => {
  const [local, setLocal] = useState(steps);
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { evmosBalance } = useEvmosBalance();
  useEffect(() => {
    if (local[0].status === "current" && value.active) {
      setLocal((prev) => {
        const copy = [...prev];
        copy[0].status = "done";
        copy[1].status = "current";
        return copy;
      });
    }

    if (local[0].status === "done" && !value.active) {
      setLocal((prev) => {
        const copy = [...prev];
        copy[0].status = "current";
        copy[1].status = "not_processed";
        copy[2].status = "not_processed";
        return copy;
      });
    }

    if (local[1].status === "current" && !evmosBalance.isZero()) {
      setLocal((prev) => {
        const copy = [...prev];
        copy[1].status = "done";
        copy[2].status = "current";
        return copy;
      });
    }
  }, [local, value, evmosBalance]);

  const stepsToDraw = useMemo(() => {
    if (local.length === 1) {
      return;
    }
    return local.map((step) => {
      return <StepsContainerDapp key={step.title} step={step} />;
    });
  }, [local]);

  const drawButton = useCallback(() => {
    return local.map((item) => {
      return <div key={item.index}>{item.buttonDapp(item.status)}</div>;
    });
  }, [local]);

  return { stepsToDraw, drawButton };
};
