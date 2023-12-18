import dynamic from "next/dynamic";

export const WIDGETS: {
  [key: string]: React.ComponentType<{}>;
} = {
  layerswap: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Layerswap"),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    }
  ),
  squid: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Squid"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }),
  "cypher-wallet": dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/CypherD"),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    }
  ),
  c14: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/C14"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }),
  transak: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Transak"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }),
  wormhole: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Wormhole"),
    {
      ssr: false,
    }
  ),
  forge: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Forge"), {
    ssr: false,
  }),
  stride: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Stride/Stride"),
    {
      ssr: false,
    }
  ),
  osmosis: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Osmosis/Osmosis"),
    {
      ssr: false,
    }
  ),
};
