// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Listbox, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import Image from "next/image";
import { DropdownArrow } from "icons";
import { cn } from "helpers";
import cx from "clsx";
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
        "flex space-x-2 items-center py-1 pl-1 pr-3 rounded-3xl justify-end tracking-wider",
        {
          "bg-gray-500": variant === "default",
          "bg-black-900": variant === "black",
        }
      )}
    >
      <Image
        src={src}
        className="rounded-full"
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

CryptoSelector.Options = ({
  children,
  className,
  label,
  variant = "default",
  ...props
}: PropsWithChildren<{
  className?: string;
  label: string;
  variant?: "default" | "multiple";
}>) => {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={cn(
          // add the following className to the CryptoSelector.Options component: left:0 or right:0
          "absolute z-10 bg-gradient-to-br from-red to-[#FFDDD880] p-[1px] rounded-2xl text-sm",
          className
        )}
      >
        <div className="pr-3 py-5 bg-black rounded-2xl">
          <Listbox.Label className="px-3 text-xs text-[#9A7873CC]">
            {label}
          </Listbox.Label>
          <Listbox.Options
            {...props}
            className={cx(
              "capitalize px-3 bg-black h-full text-black mt-1 scrollbar overflow-auto max-h-44 ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer",
              {
                "w-52": variant === "default",
                "w-80 grid grid-cols-2": variant === "multiple",
              }
            )}
          >
            {children}
          </Listbox.Options>
        </div>
      </div>
    </Transition>
  );
};

CryptoSelector.Option = ({
  children,
  src,
  disabled = false,
  ...props
}: PropsWithChildren<{
  src: string;
  value: string;
  disabled?: boolean;
}>) => {
  return (
    <Listbox.Option
      disabled={disabled}
      className={({ active, selected }) =>
        cn(
          "flex items-center space-x-2 p-2 w-full  bg-black rounded-md mb-1 text-white text-sm",
          {
            "bg-pink-600 text-black font-medium": active || selected,
            disabled: disabled,
          }
        )
      }
      {...props}
    >
      <Image
        className="h-5 w-5 rounded-full"
        src={src}
        alt=""
        width={30}
        height={30}
      />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {children}
      </div>
    </Listbox.Option>
  );
};
