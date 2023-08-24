// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const ModalContainer = ({
  introduction,
  content,
}: {
  introduction: JSX.Element;
  content: JSX.Element;
}) => {
  return (
    <div className="divide-strokeGrey text-gray1 grid grid-rows-1 divide-y md:grid-cols-3 md:grid-rows-none md:divide-x md:divide-y-0">
      <div className="flex h-full flex-col justify-between px-4 pb-4 pt-5 sm:px-6 sm:py-10">
        {introduction}
      </div>
      <div className="space-y-3 bg-white px-4 pb-4 pt-5 sm:p-10 md:col-span-2 md:px-8">
        {content}
      </div>
    </div>
  );
};
