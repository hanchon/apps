// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Badge = ({ text, style }: { text: string; style?: string }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] ring-1 ring-inset  ${
        style ?? "text-green2 ring-lightGreen bg-lightYellow2"
      }`}
    >
      {text}
    </span>
  );
};
