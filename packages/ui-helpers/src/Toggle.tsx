"use client"
import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Toggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`relative inline-flex md:h-6 md:w-11 h-4 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  ${
        enabled ? "bg-green" : "bg-darkPearl"
      }`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block md:h-5 md:w-5 h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  );
}
