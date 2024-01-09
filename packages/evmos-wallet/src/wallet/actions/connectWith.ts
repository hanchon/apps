import { connect } from "wagmi/actions";
import { ConnetorId, wagmiConfig } from "../wagmi";
import { raise } from "helpers";

export function connectWith(provider: ConnetorId) {
  return connect(wagmiConfig, {
    connector:
      wagmiConfig.connectors.find((c) => c.id === provider) ??
      raise("Invalid provider"),
  });
}
