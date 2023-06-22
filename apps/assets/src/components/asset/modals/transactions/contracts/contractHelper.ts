// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Contract, ContractInterface } from "@ethersproject/contracts";
import { ethers } from "ethers";
import { Signer } from "evmos-wallet";

export async function createContract(
  address: string,
  ABI: ContractInterface,
  walletExtension: string
) {
  const signer = new Signer();
  if (!address || !ABI) return null;
  try {
    const provider = await signer.getProvider(walletExtension);
    if (!provider) {
      return null;
    }

    const _provider = new ethers.providers.JsonRpcProvider(
      "https://eth.bd.evmos.org:8545/"
    );

    return new Contract(address, ABI, _provider);
  } catch (error) {
    if (address !== "0x0000000000000000000000000000000000000000") {
      console.error("Failed to get contract", error);
    }
    return null;
  }
}
