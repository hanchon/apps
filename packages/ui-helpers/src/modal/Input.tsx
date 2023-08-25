// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type inputProps = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
}: inputProps) => {
  return (
    <input
      className="w-full focus-visible:outline-none border border-gray300 rounded-lg px-3 py-2 text-sm placeholder-gray2 text-darkGray900"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};
