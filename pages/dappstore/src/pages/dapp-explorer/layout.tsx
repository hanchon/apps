"use server";
import { Breadcrumb } from "ui-helpers";
import { pages } from "../../data";

export const AppsExplorerLayout = (
  props: React.PropsWithChildren<{ params: { category?: string } }>
) => {
  return (
    <div className="flex flex-col space-y-8">
      <Breadcrumb pages={pages} />
      {props.children}
    </div>
  );
};
