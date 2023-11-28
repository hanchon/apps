"use client";
import { useSyncExternalStore } from "react";

const isServer = typeof window === "undefined";
class History {
  listeners = new Set<() => void>();

  constructor() {
    if (isServer) {
      return;
    }
    window.addEventListener("popstate", () => {
      this.emit();
    });
  }
  emit() {
    this.listeners.forEach((cb) => cb());
  }
  subscribe = (cb: () => void) => {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  };
  // keep the options params to match the next/router api
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  push = (url: string, _?: { scroll: boolean }) => {
    if (isServer) {
      return;
    }
    window.history.pushState({}, "", url);
    this.emit();
  };
  // keep the options params to match the next/router api
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  replace = (url: string, _?: { scroll: boolean }) => {
    if (isServer) {
      return;
    }
    window.history.replaceState({}, "", url);
    this.emit();
  };
  getSnapshot = () => {
    return new URL(window.location.href).searchParams.toString();
  };
}
const customHistory = new History();
export const _useRouter = () => {
  const searchParams = useSyncExternalStore(
    customHistory.subscribe,
    customHistory.getSnapshot,
    () => ""
  );

  return {
    searchParams,
    push: (url: string, options?: { scroll: boolean }) => {
      customHistory.push(url, options);
    },
    replace: (url: string, options?: { scroll: boolean }) => {
      customHistory.replace(url, options);
    },
  };
};
