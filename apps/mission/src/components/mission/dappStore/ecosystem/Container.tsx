import Link from "next/link";
import { Button } from "../Button";
import { EcosystemCard } from "./Card";
import { EcosystemProps, ecosystemData } from "./ecosystemData";

const ecosystemPage =
  "https://altiplanic.notion.site/a188bd13dd114a88a7763fd2a8cc601e?v=403420ad21db41ce81f09b7e3f77e4e2";
const googleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSc2O5HzjZMPbFD84O1513xJ0mggkSXihQy_a6IGskZq28l8yA/viewform";
export const EcosystemContainer = () => {
  const handleViewAlldApps = () => {
    // redirect
    window.open(ecosystemPage, "_blank");
  };

  const drawEcosystemdApps = (dApps: EcosystemProps[]) => {
    return dApps.map((dApp) => <EcosystemCard key={dApp.name} data={dApp} />);
  };

  return (
    <section className="space-y-6 pt-11">
      <div className="md:spacey-0 flex flex-col justify-between space-y-4 md:flex-row">
        <div className="space-y-1">
          <h1 className="text-2xl text-pearl">Featured Ecosystem dApps</h1>
          <h2 className="text-[#FFFFFFB2]">
            Interested in being a part of our ecosystem overview?
            <Link
              className="ml-2 text-red"
              href={googleFormUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Click here!
            </Link>
          </h2>
        </div>
        <Button text="View all dApps" handleOnClick={handleViewAlldApps} />
      </div>
      <div className="grid gap-8 md:grid-cols-4">
        {drawEcosystemdApps(ecosystemData)}
      </div>
    </section>
  );
};
