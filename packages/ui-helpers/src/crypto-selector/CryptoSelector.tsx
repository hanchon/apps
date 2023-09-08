// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Listbox, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import Image from "next/image";
import { DropdownArrow } from "icons";
import { cn } from "helpers";

export function CryptoSelector<T extends string>(
  props: PropsWithChildren<{
    value: T;
    onChange: (value: T) => void;
  }>
) {
  return (
    <div className="relative">
      <Listbox {...props} />
    </div>
  );
}

CryptoSelector.Button = ({
  children,
  src,
  variant = "default",
}: PropsWithChildren<{
  src: string;
  variant?: "default" | "black";
}>) => {
  return (
    <Listbox.Button
      className={cn(
        "flex space-x-2 items-center py-1 pl-1 pr-3 rounded-3xl justify-end",
        {
          "bg-gray-500": variant === "default",
          "bg-black-900": variant === "black",
        }
      )}
    >
      <Image
        src={src}
        alt=""
        width={variant === "default" ? 24 : 34}
        height={variant === "default" ? 24 : 34}
      />
      <span className="text-sm text-white capitalize">{children}</span>
      <DropdownArrow
        className="h-5 w-5 pointer-events-none text-red"
        aria-hidden="true"
      />
    </Listbox.Button>
  );
};

CryptoSelector.Options = ({ children, ...props }: PropsWithChildren<{}>) => {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options
        {...props}
        // md:left-0 has to be different depending on the option
        className={cn(
          "capitalize absolute z-10 mt-1 overflow-auto max-h-60 py-1 w-52 px-2 text-black text-sm rounded-md bg-[#262017] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        )}
        // w-64 md:w-96
        // className="overflow-auto shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        {children}
      </Listbox.Options>
    </Transition>
  );
};

CryptoSelector.Option = ({
  children,
  src,
  ...props
}: PropsWithChildren<{
  src: string;
  value: string;
}>) => {
  return (
    <Listbox.Option
      className={({ active, selected }) =>
        cn(
          "flex font-bold items-center space-x-2 p-2 bg-pink-600 rounded-md mb-1 text-black text-sm border-l-[3px] border-l-pink-200",
          {
            "bg-pink-500": active,
            "bg-pink-500 border-l-[3px] border-l-pink-300": selected,
          }
        )
      }
      {...props}
    >
      <Image className="h-5 w-5" src={src} alt="" width={30} height={30} />
      <div className="whitespace-nowrap">{children}</div>
    </Listbox.Option>
  );
};
