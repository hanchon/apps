// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Button = ({
  text,
  handleOnClick,
}: {
  text: string;
  handleOnClick: () => void;
}) => {
  return (
    <button
      className="w-fit self-start rounded bg-[#423D37] px-5 py-3 text-sm text-pearl transition-all duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]"
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
};
