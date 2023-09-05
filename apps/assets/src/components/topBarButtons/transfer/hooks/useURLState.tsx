import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export const useURLState = <T extends ParsedUrlQuery>(defaultValue: T) => {
  const { isReady, push } = useRouter();

  const [searchParams, setSearchParams] = useState<T>(defaultValue);
  // Reads query params from URL and set them to state when component mounts
  useEffect(() => {
    if (!isReady) return;
    setSearchParams((prev) => ({
      ...prev,
    }));
  }, [isReady]);

  // Update query params when state changes
  useEffect(() => {
    push({
      query: searchParams,
    });
  }, [searchParams]);

  // Reset query params when unmount
  useEffect(() => {
    () => {
      push({
        query: null,
      });
    };
  }, []);
  return [searchParams, setSearchParams] as const;
};
