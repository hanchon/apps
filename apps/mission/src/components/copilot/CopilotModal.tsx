import { Dispatch, SetStateAction } from "react";
import { ModalWithTransitions } from "ui-helpers";
import { Introduction } from "./Introduction";
import { SetUpAccountContainer } from "./steps/setUpAccount/SetUpAccountContainer";

export const CopilotModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const contentModal = (
    <div className="grid grid-rows-1 divide-y divide-[#DBD3D1] text-[#413836] md:grid-cols-3 md:grid-rows-none md:divide-y-0 md:divide-x">
      <div className="flex h-full flex-col justify-between px-4 pb-4 pt-5 sm:p-10">
        <Introduction />
        <div>
          steps
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </div>
      </div>
      <div className="space-y-3 bg-white px-4 pb-4 pt-5 sm:p-10 md:col-span-2 md:px-8">
        <SetUpAccountContainer />
      </div>
    </div>
  );

  return (
    <ModalWithTransitions
      show={show}
      setShow={setShow}
      content={contentModal}
      propClose={true}
    />
  );
};
