import { useRouter } from "next/router";
import { useMemo, useCallback, SetStateAction } from "react";
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

/**
 * Hook to manage modals
 *
 * State is managed in the URL query params
 * @param id Unique ID for the modal
 * @param schema Zod schema to define and validate the state
 *
 */
export const useModal = <T extends z.AnyZodObject>(
  id: string,
  schema: T = z.object({}) as T
) => {
  const { isReady, push, replace, query } = useRouter();

  const isOpen = id === query.action;

  const state = useMemo(() => {
    if (!isReady) return null;
    if (!isOpen) return null;

    const params = schema.safeParse(query);

    if (params.success) {
      return params.data;
    }
    return null;
  }, [isReady, query, isOpen]);

  const setState = useCallback(
    (next: SetStateAction<z.infer<T>>, pushState = false) => {
      const nextState = typeof next === "function" ? next(next) : next;

      (pushState ? push : replace)({
        query: {
          action: id,
          ...sanitize(nextState),
        },
      });
    },
    [id]
  );

  const setIsOpen = useCallback(
    (open: boolean, initialState: z.infer<T> = {}) => {
      if (open) {
        const next = schema.safeParse(initialState);
        if (next.success) {
          setState(next.data, true);
        }
        return;
      }
      // Clear state only if modal is open, otherwise it could close other modals
      if (isOpen)
        push({
          query: null,
        });
    },
    [id, schema, isOpen]
  );

  if (isOpen && state) {
    return {
      state: state as z.infer<T>,
      isOpen,
      setState,
      setIsOpen,
      modalProps: {
        ...(state as z.infer<T>),
        isOpen,
        setState,
        setIsOpen,
      },
    };
  }
  return {
    state: null,
    isOpen,
    setState,
    setIsOpen,
    modalProps: null,
  };
};

export type ModalProps<T extends z.AnyZodObject> = NonNullable<
  ReturnType<typeof useModal<T>>["modalProps"]
>;
