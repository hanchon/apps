import { LaunchIcon } from "icons";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { launchPadItems } from "./data";
import { Item } from "./Item";
import Link from "next/link";
import { ECOSYSTEM_URL } from "constants-helper";
export const LaunchContainer = () => {
  const drawItems = () => {
    return launchPadItems.map((item, index) => {
      return <Item key={index} itemProps={item} />;
    });
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="border-darGray800 bg-darGray800 flex items-center justify-center rounded-full border p-2">
        <LaunchIcon width={30} height={30} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-64 origin-top-right divide-y divide-[#3D372D] rounded-md bg-[#262017] pb-6 pt-8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0 md:w-96">
          <div className="grid grid-cols-3 gap-10  px-8 pb-8">
            {drawItems()}
          </div>
          <Link
            href={ECOSYSTEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pearl flex justify-center pt-6 text-xs"
          >
            View all DApps
          </Link>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
