import { Breadcrumb } from "ui-helpers";

const pages = [
  {
    name: "dappStore",
    href: "/",
  },
  {
    name: "All",
    href: "/",
    current: "page",
  },
];

export const ExplorerdApps = () => {
  return (
    <>
      <Breadcrumb pages={pages} />
    </>
  );
};
