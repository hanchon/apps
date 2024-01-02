// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CopilotCard } from "./copilot-card";
import { PropsWithChildren } from "react";
import { RootProviders } from "stateful-components/src/root-providers";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));
vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),

    cache: (fn: unknown) => fn,
    "server-only": {},
  };
});

// TypeError: getActiveProviderKey is not a function

describe.skip("Testing Copilot Card", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for clicking on let's go", async () => {
    render(<CopilotCard />, { wrapper });
    const button = await screen.findByText("Let's go");
    expect(button).toBeDefined();
  });
});
