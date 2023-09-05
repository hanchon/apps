import React, { Fragment, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { DownArrowIcon, DropdownArrow } from "icons";
import Image from "next/image";
import cx from "clsx";
import { cn } from "helpers";

export function SearchableSelect<T>({
  options,
  placeholder,
  selected,
  setSelected,
  notFoundMessage = "Nothing found.",
  disabled,
  children,
}: {
  options: { label: string; id: T }[];
  placeholder?: string;
  selected?: T | null;
  setSelected?: (value: T | null) => void;
  notFoundMessage?: string;
  disabled?: boolean;
  children: (props: {
    label: string;
    id: string;
    selected: boolean;
    active: boolean;
    disabled: boolean;
  }) => React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions =
    query === ""
      ? options
      : options.filter(({ label }) =>
          label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const selectedOption = options.find(({ id }) => id === selected);
  return (
    <Combobox
      as="div"
      value={selected}
      onChange={setSelected}
      disabled={disabled}
    >
      <div
        className={cn(
          `
            
              cursor-default
              rounded-lg
              bg-white
              text-left
              shadow-md
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-opacity-75
              focus-visible:ring-offset-2
              focus-visible:ring-offset-teal-300
              sm:text-sm
              `
        )}
      >
        {/* {selectedOption && (
          <Image
            className="h-full w-auto p-3 absolute"
            src={selectedOption.icon}
            alt={selectedOption.label}
            width={25}
            height={25}
          />
        )} */}
        <Combobox.Input
          ref={inputRef}
          onClick={() => inputRef.current?.select()}
          placeholder={placeholder}
          spellCheck={false}
          className={
            "w-full font-bold border-none py-3 pl-10 pr-10 text-sm leading-5 text-gray-900 focus:ring-1 rounded"
          }
          displayValue={() => selectedOption?.label ?? ""}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray1">
          <DropdownArrow
            className="h-5 w-5 pointer-events-none"
            aria-hidden="true"
          />
        </Combobox.Button>
      </div>
      <Transition
        as={"div"}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <Combobox.Options className="absolute left-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
          {filteredOptions.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              {notFoundMessage}
            </div>
          ) : (
            filteredOptions.map(({ id, icon, label }) => (
              <Combobox.Option
                key={id}
                className={({ active }) =>
                  cx(
                    `relative select-none py-2 px-2 flex space-x-2 cursor-pointer`,
                    {
                      "bg-teal-600 text-white": active,
                      "text-gray-900": !active,
                    }
                  )
                }
                value={id}
              >
                {/* {({ selected, active , disabled}) => (
                  <>
                    <Image
                      className=""
                      src={icon}
                      alt={label}
                      width={25}
                      height={25}
                    />
                    <span
                      className={cx("block truncate w-full font-bold", {
                        "font-bold": selected,
                        "font-normal": !selected,
                      })}
                    >
                      {label}
                    </span>
                  </>
                )} */}

                {(props) => children({ ...props, icon, label, id })}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}
