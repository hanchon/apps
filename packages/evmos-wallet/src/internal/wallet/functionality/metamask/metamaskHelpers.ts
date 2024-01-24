// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { METAMASK_NOTIFICATIONS } from "../errors";
import type { MetaMaskInpageProvider } from "@metamask/providers";
const getMetamaskProvider = () => {
  if (typeof window === "undefined") return null;
  if (!("ethereum" in window)) {
    return null;
  }

  return window.ethereum as MetaMaskInpageProvider;
};

export type Token = {
  erc20Address: string;
  symbol: string;
  decimals: number;
  img: string;
};

export async function addToken(token: Token) {
  const mmProvider = getMetamaskProvider();

  if (mmProvider) {
    try {
      if (token) {
        const wasAdded = await mmProvider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: token.erc20Address, // The address that the token is at.
              symbol: token.symbol === "EVMOS" ? "WEVMOS" : token.symbol,
              decimals: token.decimals, // The number of decimals in the token
              image: token.img, // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          return {
            text: METAMASK_NOTIFICATIONS.AddTokenTitle,
            type: "success",
          };
        } else {
          return {
            text: METAMASK_NOTIFICATIONS.ErrorAddToken,
            type: "error",
          };
        }
      }
    } catch (err) {
      return {
        text: METAMASK_NOTIFICATIONS.ErrorAddToken,
        type: "error",
      };
    }
  }
}
