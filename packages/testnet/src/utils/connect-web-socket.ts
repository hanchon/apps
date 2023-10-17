import WebSocket from "ws";

export const connectWebSocket = async (
  url: string,
  onOpen?: (ws: WebSocket) => void
) =>
  new Promise<WebSocket>((resolve, reject) => {
    const ws = new WebSocket(url, {});

    ws.onopen = () => {
      resolve(ws);
      onOpen?.(ws);
    };
    ws.onerror = (error) => {
      reject(error);
    };
  });
