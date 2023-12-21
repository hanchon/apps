import { CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { Frameline } from "@evmosapps/ui-helpers/src/container/FrameLine";
import { TrackerEvent } from "@evmosapps/ui-helpers/src/TrackerEvent";
import { ButtonWithLink } from "@evmosapps/ui-helpers/src/links/Button";
import { translation } from "@evmosapps/i18n/server";

export const ButtonSeedApps = async ({ totalApps }: { totalApps: number }) => {
  const { t } = await translation("dappStore");
  return (
    <Frameline>
      <TrackerEvent
        event={CLICK_ON_VIEW_ALL_DAPPS}
        properties={{ Location: "Home Page" }}
      >
        <ButtonWithLink className="w-full " href="/dapps">
          {t("ecosystem.button.text")} {totalApps} {t("ecosystem.button.text2")}
        </ButtonWithLink>
      </TrackerEvent>
    </Frameline>
  );
};
