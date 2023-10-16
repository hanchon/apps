import { C14Icon, CypherDIcon, LayerSwapIcon, TransakIcon } from "icons";

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
    name: "Cypher",
    image: <CypherDIcon width={20} height={20} />,
    value: "Cypher",
  },
];
