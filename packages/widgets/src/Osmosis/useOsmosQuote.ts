import { useState } from "react";
import { SwapOption } from "./useOsmosisData";

type OsmosisQouteResponse = {
  price_impact: number;
  return_amount: number;
};

export function useOsmosisQoute() {
  const [loading, setLoading] = useState(false);
  const [latestQoute, setLatestQoute] = useState<OsmosisQouteResponse | null>(
    null,
  );

  function getQoute(token0: SwapOption, token1: SwapOption, amount: string) {
    if (amount === "0") {
      setLatestQoute({
        price_impact: 0,
        return_amount: 0,
      });
      return;
    }
    setLoading(true);
    fetch(`
        https://api.multichain.tfm.com/route?chain0=osmosis-1&chain1=osmosis-1&token0=${token0.osmosisDenom}&token1=${token1.osmosisDenom}&amount=${amount}&exchange_specific_results=true`)
      .then(async (res) => {
        const data = (await res.json()) as OsmosisQouteResponse;
        setLatestQoute(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return { loading, getQoute, latestQoute };
}
