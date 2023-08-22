import { MAVA_WIDGET_URL } from "constants-helper";
import Script from "next/script";

export const MavaWidget = () => {
  return (
    <Script
      defer
      src={MAVA_WIDGET_URL}
      id="MavaWebChat"
      data-token={process.env.NEXT_PUBLIC_MAVA_TOKEN}
    />
  );
};
