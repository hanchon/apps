import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";

const serialize = <T extends Record<string, unknown>>(obj: T) => {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
};

const sanitize = <T extends Record<string, unknown>>(obj: T) => {
  return JSON.parse(serialize(obj));
};

export const useModalState = <
  T extends z.AnyZodObject,
  TDefaultState extends z.infer<T>,
>(
  id: string,
  schema: T,
  defaultValue: TDefaultState
) => {
  const { isReady, push, replace, query } = useRouter();

  const [searchParams, setSearchParams] = useState<z.infer<T>>(defaultValue);

  // Reads query params from URL and set them to state when component mounts
  useEffect(() => {
    if (!isReady) return;
    const params = schema.safeParse(query);

    if (params.success) {
      setSearchParams(params.data);
      return;
    }
  }, [isReady]);

  // Update query params when state changes
  useEffect(() => {
    replace({
      query: searchParams
        ? {
            action: id,
            ...sanitize(searchParams),
          }
        : null,
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

  return {
    state: searchParams,
    setState: setSearchParams,
  };
};

export const useModal = (id: string) => {
  const { isReady, query, push } = useRouter();
  const show = isReady && query.action === id;
  return {
    isReady,
    show,
    async setShow(show: boolean) {
      return await push({
        query: {
          action: show ? id : undefined,
        },
      });
    },
  };
};
