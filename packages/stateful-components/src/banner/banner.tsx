"use server";
import { Banner } from "@evmosapps/ui-helpers";
import { getServiceDisruptionData } from "./fetch-service-status";

export const StatefulBanner = async () => {
  const data = await getServiceDisruptionData();
  if (data === null) return null;
  return <Banner>{data}</Banner>;
};
