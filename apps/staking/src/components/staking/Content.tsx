import dynamic from "next/dynamic";
import { SearchWrapper } from "../../internal/common/context/SearchContext";
import { ValidatorStateWrapper } from "../../internal/common/context/ValidatorStateContext";
import Navigation from "../common/navigation/Navigation";
import { tabsContent } from "./Tabs/Content";
import {
  EVMOS_PAGE_URL,
  NAV_TO_MISSION_CONTROL,
} from "../../internal/common/helpers/constants";

const TopBarStaking = dynamic(() => import("./components/TopBarStaking"));
const Tabs = dynamic(() => import("../common/tabComponent/Tabs"));

const Content = () => {
  return (
    <SearchWrapper>
      <ValidatorStateWrapper>
        <div className="">
          <Navigation href={EVMOS_PAGE_URL} text={NAV_TO_MISSION_CONTROL} />
          <TopBarStaking />
          <div className=" xl:scrollbar-hide mt-5 max-h-[33vh] w-full overflow-y-auto px-2 font-[IBM] text-pearl sm:max-h-[45vh] lg:max-h-[53vh]">
            <Tabs
              tabsContent={tabsContent}
              placeholder="Search Validators..."
            />
          </div>
        </div>
      </ValidatorStateWrapper>
    </SearchWrapper>
  );
};

export default Content;