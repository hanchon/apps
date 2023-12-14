// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const CardTitle = ({
  firstWord,
  secondWord,
}: {
  firstWord: string;
  secondWord: string;
}) => {
  return (
    <h1 className="mb-1 text-3xl font-bold text-pearl first-letter:uppercase">
      {firstWord} <span className="text-red-300 font-evmos">{secondWord}</span>
    </h1>
  );
};
