import { useRouter } from "next/router";

export const useTransferModal = () => {
  const { isReady, query, push } = useRouter();
  const show = isReady && query.action === "TRANSFER";
  return {
    show,
    setShow: (show: boolean) => {
      if (!isReady) return;
      push({
        query: {
          action: show ? "TRANSFER" : undefined,
        },
      });
    },
  };
};
