// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Switch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}) => {
  return (
    <div className="mt-3 flex items-center justify-center xl:mt-0">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          onChange={onChange}
          checked={checked}
        />
        <div
          className="bg-darkGray3 text-pearl peer-checked:bg-darkGray3 
        peer-checked:after:border-red-300 peer-checked:after:bg-red-300 
          h-3 w-8 rounded-full after:absolute after:left-[1px] after:top-[0px] 
          after:h-4 after:w-4 after:rounded-full after:border after:border-white
         after:bg-white after:transition-all after:content-['']
          peer-checked:after:translate-x-full
          dark:border-gray-600"
        ></div>
        <span className="text-pearl ml-3 text-xs font-medium">{label}</span>
      </label>
    </div>
  );
};
