import { C14Icon, LayerSwapIcon, TransakIcon } from "icons";

export type DropdownOption = {
  name: string;
  image: JSX.Element;
  value: string;
};

export const cardOptions: DropdownOption[] = [
  {
    name: "C14",
    image: <C14Icon width={20} height={20} />,
    value: "C14",
  },
  {
    name: "Transak",
    image: <TransakIcon width={20} height={20} />,
    value: "Transak",
  },
];

export const cryptoOptions: DropdownOption[] = [
  {
    name: "LayerSwap",
    image: <LayerSwapIcon width={20} height={20} />,
    value: "LayerSwap",
  },
  {
    name: "CypherD",
    // TODO: change icon to CypherD
    image: <LayerSwapIcon width={20} height={20} />,
    value: "CypherD",
  },
];
