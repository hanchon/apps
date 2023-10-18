const config = {
  integratorId: "evmosdappstore-swap-widget",
  companyName: "Evmos",
  style: {
    neutralContent: "#747379",
    baseContent: "#2E2C33",
    base100: "#F5F5F7",
    base200: "#F2F2F2",
    base300: "#DADADA",
    error: "#ED6A5E",
    warning: "#FFB155",
    success: "#2EAEB0",
    primary: "#2E2C33",
    secondary: "#070707",
    secondaryContent: "#FFFFFF",
    neutral: "#FFFFFF",
    roundedBtn: "999px",
    roundedCornerBtn: "999px",
    roundedBox: "1rem",
    roundedDropDown: "999px",
  },
  slippage: 1.5,
  infiniteApproval: false,
  enableExpress: true,
  apiUrl: "https://api.squidrouter.com",
  comingSoonChainIds: [],
  titles: {
    swap: "Swap",
    settings: "Settings",
    wallets: "Wallets",
    tokens: "Select Token",
    chains: "Select Chain",
    history: "History",
    transaction: "Transaction",
    allTokens: "Select Token",
    destination: "Destination address",
  },
  priceImpactWarnings: {
    warning: 3,
    critical: 5,
  },
  showOnRampLink: true,
  initialToChainId: "evmos_9001-2",
};

const configJSON = JSON.stringify(config); // Convert the config object to a JSON string
const encodedConfig = encodeURIComponent(configJSON); // Encode the JSON string

export const Squid = () => {
  return (
    <div className="relative mx-auto mt-[25px] h-[700px] w-[300px] overflow-hidden rounded-[15px] md:h-[690px] md:w-[400px]">
      <iframe
        title="squid-widget"
        width="100%"
        height="100%"
        className=""
        src={`https://widget.squidrouter.com/iframe?config=${encodedConfig}`}
      />
    </div>
  );
};
