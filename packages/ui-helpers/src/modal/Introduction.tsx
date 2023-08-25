// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosRedIcon } from "icons";
import { Description, Title } from "ui-helpers";
export const IntroductionModal = ({
  title,
  description,
  content,
  icon,
}: {
  title: string;
  description: string | JSX.Element;
  content?: JSX.Element;
  icon?: JSX.Element;
}) => {
  return (
    <section className="flex flex-col space-y-4 text-gray1 h-full">
      {icon ? icon : <EvmosRedIcon height={70} />}
      <Title>{title}</Title>
      <Description>{description}</Description>
      <div className="flex flex-col space-y-2 text-[10px] h-full justify-end">
        {content}
      </div>
    </section>
  );
};
