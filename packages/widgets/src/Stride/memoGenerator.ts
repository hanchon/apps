export const STAKE_ACTION = "LiquidStake";

// Types
type StrideOutpostMemo = {
  autopilot: {
    receiver: string;
    stakeibc: {
      ibc_receiver: string;
      action: string;
    };
  };
};

// GenerateStrideMemo validates sender, receiver and action (NOTE: throws on error)
export function GenerateStrideMemo(
  // Evmos wallet that will get the staked evmos
  sender: string,
  // Stride wallet in case of failure
  receiver: string,
  // There are 2 more actions that can be executed using IBC
  action: string = STAKE_ACTION,
) {
  // Validations
  if (action != STAKE_ACTION) {
    throw new TypeError(`${STAKE_ACTION} is the only supported action`);
  }

  const validSender = sender.startsWith("evmos1") && sender.length == 44;
  if (!validSender) {
    throw new TypeError("sender can only be a bech32 evmos wallet");
  }

  const validReceiver = receiver.startsWith("stride1") && receiver.length == 45;
  if (!validReceiver) {
    throw new TypeError("receiver can only be a bech32 stride wallet");
  }

  // Create message
  const msg: StrideOutpostMemo = {
    autopilot: {
      receiver: receiver,
      stakeibc: {
        ibc_receiver: sender,
        action: action,
      },
    },
  };

  return JSON.stringify(msg);
}
