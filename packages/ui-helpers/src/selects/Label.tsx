import { InformationIcon } from "@evmosapps/icons/InformationIcon";
import { Tooltip } from "../Tooltip";

type LabelProps = {
  id: string;
  children: React.ReactNode;
  tooltip?: {
    description: string;
  };
};

export const Label = ({ id, children, tooltip }: LabelProps) => {
  return (
    <div className="flex items-center space-x-1">
      <label className="text-xs font-bold " htmlFor={id}>
        {children}
      </label>
      {tooltip && (
        <Tooltip
          className="min-w-[8rem] text-xs"
          element={<InformationIcon width={15} height={15} />}
          text={tooltip.description}
        />
      )}
    </div>
  );
};
