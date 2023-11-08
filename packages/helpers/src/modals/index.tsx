"use client";
import { useRouter, useSearchParams } from "next/navigation";
import qs, { ParsedUrlQueryInput } from "querystring";
import {
  useMemo,
  SetStateAction,
  useEffect,
  ComponentProps,
  useRef,
} from "react";
import { z } from "zod";
import { useEffectEvent } from "../hooks/use-effect-event";

const serialize = <T extends z.output<z.AnyZodObject>>(obj: T) => {
  return JSON.stringify(obj, (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value as unknown;
  });
};

const sanitize = (obj: z.output<z.AnyZodObject>) => {
  return JSON.parse(serialize(obj)) as ParsedUrlQueryInput;
};

const usePrevious = <T extends unknown>(value: T) => {
  const ref = useRef<T>(value);
  useEffect(() => {
    return () => {
      ref.current = value;
    };
  }, [value]);
  return ref.current;
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
  const safeParse: T["safeParse"] = useEffectEvent(schema.safeParse);
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const query = useMemo(() => {
    return qs.decode(searchParams.toString());
  }, [searchParams.toString()]);

  const prevAction = usePrevious(query?.action);

  const routeTo = prevAction !== query.action ? push : replace;

  const state = useMemo(() => {
    const parsed = safeParse(query);
    if (parsed.success) return parsed.data;
    return null;
  }, [query]);
  const isOpen = query.action === id && state;
  const setState = useEffectEvent((next: SetStateAction<z.output<T>>) => {
    if (!isOpen) throw new Error("You can't set state on a closed modal");

    const nextState = typeof next === "function" ? next(state) : next;
    const url = new URL(window.location.href);
    url.search = qs.stringify({
      action: id,
      ...sanitize(nextState),
    });

    routeTo(url.toString());
  });

  const setIsOpen = useEffectEvent(
    (open: boolean, initialState: z.output<T> = {}, redirectBack = false) => {
      console.log("set is open ", open);
      if (open) {
        const next = safeParse(initialState);

        if (next.success) {
          const url = new URL(window.location.href);
          url.search = qs.stringify({
            action: id,
            ...sanitize(next.data),
          });
          if (redirectBack && typeof query.action === "string") {
            const redirect = window.location.href;
            url.searchParams.set("redirect", redirect);
          }
          push(url.toString());
        }
        return;
      }

      const url = new URL(window.location.href);
      url.search = "";
      if (typeof query.redirect === "string") {
        push(query.redirect);
        return;
      }
      push(url.toString());
    }
  );

  if (query.action !== id || !state) {
    return {
      isOpen: false,
      setState: () => {},
      setIsOpen,
      modalProps: null,
    };
  }

  return {
    isOpen: true,
    setState,
    setIsOpen,
    modalProps: {
      ...state,
      setState,
      setIsOpen,
    },
  };
};

type ModalLinkProps<T extends z.AnyZodObject> = {
  initialState?:
    | z.output<T>
    | (() => z.output<T>)
    | (() => Promise<z.output<T>>);
  redirectBack?: boolean;
  children: React.ReactNode;
};
export const modalLink =
  <T extends z.AnyZodObject>(id: string) =>
  (props: ModalLinkProps<T> & ComponentProps<"button">) => {
    const { setIsOpen } = useModal<T>(id);

    return (
      <button
        onClick={async (e) => {
          e.preventDefault();
          if (props.initialState instanceof Function) {
            const state = await props.initialState();
            return;
          }
          setIsOpen(true, props.initialState, props.redirectBack);
        }}
      >
        {props.children}
      </button>
    );
  };

export type ModalProps<T extends z.AnyZodObject> = NonNullable<
  ReturnType<typeof useModal<T>>["modalProps"]
>;
