// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Card = ({ children }: { children: JSX.Element }) => {
  return (
    <section className="flex flex-col justify-between space-y-8 rounded-lg bg-darGray800 p-8">
      {children}
    </section>
  );
};
