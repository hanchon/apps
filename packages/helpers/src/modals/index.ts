import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { useMemo, SetStateAction } from "react";
import { z } from "zod";
import { useEffectEvent } from "../hooks/use-effect-event";

const serialize = <T extends Record<string, unknown>>(obj: T) => {
  return JSON.stringify(obj, (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value as unknown;
  });
};

const sanitize = (obj: Record<string, unknown>) => {
  return JSON.parse(serialize(obj)) as ParsedUrlQueryInput;
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
  const parse = useEffectEvent(schema.parse);
  const safeParse = useEffectEvent(schema.safeParse);
  const isOpen = id === query.action;

  const state = useMemo(() => {
    if (!isReady) return null;
    if (!isOpen) return null;

    return parse(query);
  }, [isReady, query, isOpen, parse]);

  const setState = useEffectEvent(
    (next: SetStateAction<z.infer<T>>, pushState = false) => {
      const nextState = typeof next === "function" ? next(parse(query)) : next;

      void (pushState ? push : replace)({
        query: {
          action: id,
          ...sanitize(nextState),
        },
      });
    }
  );

  const setIsOpen = useEffectEvent(
    (open: boolean, initialState: z.infer<T> = {}) => {
      if (open) {
        const next = safeParse(initialState);
        if (next.success) {
          setState(next.data, true);
        }
        return;
      }
      // Clear state only if modal is open, otherwise it could close other modals
      void push({
        query: null,
      });
    }
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
