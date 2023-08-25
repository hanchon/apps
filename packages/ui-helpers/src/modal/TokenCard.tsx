import { DownArrowIcon, EvmosRedIcon } from "icons";
import { TextBox } from "ui-helpers";
export const TokenCard = () => {
  // TODO: add the right information
  // TODO: not sure how are going to handle this part. Refactor if it is needed

  return (
    <section className="bg-pearl1 p-3 border border-gray300 rounded-lg">
      <TextBox>
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-2">
            <EvmosRedIcon height={20} />
            <p className="text-sm font-bold">TOKEN</p>
          </div>
          <DownArrowIcon className="text-black" height={5} />
        </div>
      </TextBox>

      <div className="flex space-x-1 font-bold text-xl mt-3 pl-2">
        <p className="">0.00</p>
        <p className="opacity-40">TOKEN</p>
      </div>
      <p className="opacity-30 text-sm pl-2">$0.00</p>
    </section>
  );
};
