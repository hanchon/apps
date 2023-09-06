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
}: PropsWithChildren<{
  src: string;
}>) => {
  return (
    <Listbox.Button className="flex space-x-2">
      <Image src={src} alt="" width={30} height={30} />
      <span>{children}</span>
      <DropdownArrow
        className="h-5 w-5 pointer-events-none"
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
