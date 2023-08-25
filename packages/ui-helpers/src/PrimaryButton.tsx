// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const PrimaryButton = ({
  onClick,
  children,
  className,
  icon,
  disabled,
}: {
  onClick: () => void;
  children: JSX.Element | string;
  className?: string;
  icon?: JSX.Element;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red text-pearl hover:bg-red1 w-fit text-sm font-bold px-4 py-2 active:bg-red2 
     rounded-lg  shadow transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3 ${
       className ? className : ""
     } ${disabled ? "disabled" : ""}`}
    >
      {icon && <span>{icon}</span>} {children}
    </button>
  );
};
