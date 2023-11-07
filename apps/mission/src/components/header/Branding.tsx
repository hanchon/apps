"use client";
import { Logo } from "icons";
import { EVMOS_PAGE_URL } from "constants-helper";

import { useTranslation, Link } from "@evmosapps/i18n/client";
import { usePathname } from "next/navigation";

export const Branding = () => {
  const { t } = useTranslation();
  const [pageRoute] = usePathname()?.split("/")[2] ?? ["dappstore"];
  return (
    <Link
      href={"/"}
      rel="noreferrer"
      className="flex justify-center items-center h-7 md:h-8 lg:h-9"
      aria-label="home"
    >
      <Logo className="h-7 md:h-8 lg:h-9 w-auto mr-2 lg:mr-3" />
      <p className="text-red relative top-[6px] text-[24px] md:text-[30px] lg:text-[36px] font-bold font-brand ">
        <span className="text-pearl mr-4 md:mr-5 lg:mr-6">Evmos</span>
        {t(`header.${pageRoute}`)}
      </p>
    </Link>
  );
};
