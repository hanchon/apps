import Link from "next/link";

const Header = () => {
  return (
    <div className="mb-6 flex w-full justify-between">
      <span className="font-[GreyCliff] text-xl font-bold text-pearl">
        APPS ON EVMOS
      </span>
      <div className="flex gap-2">
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://evmos.org/ecosystem"
          aria-label="docs"
        >
          {/* TODO: use button component */}
          <div className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity">
            <span>ECOSYSTEM</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;