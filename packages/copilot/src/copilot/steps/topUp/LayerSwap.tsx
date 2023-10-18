// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StoreType } from "evmos-wallet";
import { useSelector } from "react-redux";

export default function LayerSwap() {
  // address has to be 0x format
  const address = useSelector((state: StoreType) => state.wallet.value);
  return (
    <div
      data-testid="layerswap-widget"
      className="relative mx-auto mt-[25px] h-[700px] w-[300px] overflow-hidden rounded-[15px] md:h-[545px] md:w-[400px]"
    >
      <iframe
        style={{ height: "100%", width: "100%", border: "none" }}
        src={`https://layerswap.io/app/?to=EVMOS_MAINNET&destAddress=${address?.evmosAddressEthFormat}&addressSource=evmos`}
      ></iframe>
    </div>
  );
}
