// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Fragment, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseIcon } from "icons";
import useEventListener from "./useEventListener";
import cx from "clsx";

export const ModalWithTransitions = ({
  show,
  setShow,
  children,
  propClose,
  handleCloseAction,
  variant = "default",
}: PropsWithChildren<{
  show: boolean;
  setShow: (show: boolean) => void;
  propClose?: boolean;
  handleCloseAction?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: "default" | "modal-black";
}>) => {
  const handleCloseModal = () => {
    // open a second modal if the user closes the first one.
    if (handleCloseAction) {
      handleCloseAction(true);
    } else {
      setShow(false);
    }
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  });

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        static
        onClose={() => {
          propClose ?? setShow(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="transition duration-100 ease-in"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setShow(false);
            }}
          />
        </Transition.Child>

        <div className="fixed inset-0 pointer-events-none h-full w-full flex items-center justify-center py-4">
          <Transition.Child
            as={Fragment}
            enter="transition duration-100 ease-in"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Dialog.Panel
              className={cx(
                "relative transform max-h-full rounded-lg text-left transition-all pointer-events-auto",
                {
                  "bg-pearl1 shadow-xl md:min-w-[400px] max-w-[850px]":
                    variant === "default",
                  "bg-black-900 shadow-custom-sm px-6 pt-6 pb-16 text-white w-full max-w-md overflow-auto":
                    variant === "modal-black",
                },
              )}
            >
              {propClose && (
                <button
                  type="button"
                  className="focus-visible:outline-none absolute right-6 top-4"
                  onClick={handleCloseModal}
                >
                  <span className="sr-only">Close</span>
                  <CloseIcon
                    className={cx("h-6 w-auto", {
                      "text-gray2": variant === "default",
                      "text-pink-300": variant === "modal-black",
                    })}
                    aria-hidden="true"
                  />
                </button>
              )}

              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
