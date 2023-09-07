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
  return <Listbox {...props} />;
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
        className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
        cn("flex items-center space-x-2 p-2 hover:bg-gray", {
          "bg-gray": active,
          "font-bold": selected,
        })
      }
      {...props}
    >
      <Image className="h-5 w-5" src={src} alt="" width={30} height={30} />
      <div className="whitespace-nowrap">{children}</div>
    </Listbox.Option>
  );
};
