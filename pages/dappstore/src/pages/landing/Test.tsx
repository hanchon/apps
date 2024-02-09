"use client";
import { createHost } from "@evmos/dappstore-sdk-router/internal/host";
import {
  type ProviderConnectListener,
  createDAppstoreClient,
} from "@evmos/dappstore-sdk-router";

import { useEffect, useState } from "react";
import { useConfig } from "wagmi";

export const Test = () => {
  const config = useConfig();
  useEffect(() => {
    return createHost(config as never);
  }, [config]);

  return (
    <div>
      <h1>portal</h1>
      <Widget />
    </div>
  );
};

const Widget = () => {
  const [client] = useState(() => createDAppstoreClient());

  useEffect(() => {
    const listener: ProviderConnectListener = (data) => {
      console.log("changed", data);
    };

    client.provider.on("connect", listener);
    return () => {
      client.provider.removeListener("connect", listener);
    };
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          client.provider.request({
            method: "eth_chainId",
            params: [],
          });
        }}
      >
        chain id
      </button>

      <button
        onClick={() => {
          client.provider.request({
            method: "eth_accounts",
            params: [],
          });
        }}
      >
        accounts
      </button>
    </div>
  );
};
