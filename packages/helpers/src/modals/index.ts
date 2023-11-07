"use client";
import { useRouter, useSearchParams } from "next/navigation";
import qs, { ParsedUrlQuery, ParsedUrlQueryInput } from "querystring";
import {
  useMemo,
  SetStateAction,
  useReducer,
  useEffect,
  use,
  Reducer,
  useTransition,
  startTransition,
} from "react";
import deepEqual from "deep-equal";
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

const INIT_ACTION = { type: "init" } as const;
const openAction = <T extends z.output<z.AnyZodObject>>(
  payload?: T,
  redirect: string | null = null
) => ({ type: "open", payload, redirect }) as const;
const closeAction = () => ({ type: "close" }) as const;
const updateAction = <T extends z.output<z.AnyZodObject>>(payload: T) =>
  ({ type: "update", payload }) as const;

type ModalAction<T extends z.output<z.AnyZodObject>> =
  | ReturnType<typeof openAction | typeof closeAction | typeof updateAction<T>>
  | typeof INIT_ACTION;

type ReducerState<T> =
  | {
      isOpen: true;
      state: T;
      redirect: string | null;
    }
  | {
      isOpen: false;
      state: null;
      redirect: null;
    };

const modalStateReducer = <T extends z.output<z.AnyZodObject>>(
  state: ReducerState<T>,
  action: ModalAction<T>
): ReducerState<T> => {
  switch (action.type) {
    case "init":
      return {
        isOpen: false,
        state: null,
        redirect: null,
      };
    case "open":
      if (state.isOpen) return state;
      return {
        isOpen: true,
        state: (action.payload ?? {}) as T,
        redirect: action.redirect,
      };

    case "close":
      if (!state.isOpen) return state;
      return {
        isOpen: false,
        state: null,
        redirect: null,
      };

    case "update":
      if (!state.isOpen) return state;
      if (deepEqual(state.state, action.payload)) return state;
      return {
        ...state,
        state: {
          ...state.state,
          ...action.payload,
        },
      };

    default:
      return state;
  }
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
  type State = z.output<T>;

  const safeParse: T["safeParse"] = useEffectEvent(schema.safeParse);
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const query = useMemo(() => {
    return Object.fromEntries([...searchParams.entries()]);
  }, [searchParams.toString()]);

  const [data, dispatch] = useReducer(
    modalStateReducer<State>,
    {
      isOpen: false,
      state: null,
    } as ReducerState<State>,
    (state) => {
      if (query.action === id) {
        const next = safeParse(query);

        if (next.success) {
          return modalStateReducer(state, openAction<State>(next.data));
        }
      }
      return modalStateReducer(state, INIT_ACTION);
    }
  );

  const syncUrl = useEffectEvent(() => {
    if (data.isOpen) {
      const url = new URL(window.location.href);
      // if prev url already had the current action we just replace history
      const fn = url.searchParams.get("action") !== id ? push : replace;

      url.search = qs.stringify({
        action: id,
        ...data.state,
      });

      fn(url.toString());
      return;
    }
    if (query.action === id) {
      push(window.location.pathname);
    }
  });

  useEffect(() => {
    startTransition(() => {
      syncUrl();
    });
  }, [data.state]);

  useEffect(() => {
    if (query.action === id) {
      dispatch(openAction(query));
      return;
    }
    dispatch(closeAction());
  }, [query.action, id]);

  useEffect(() => {
    if (data.isOpen) {
      return () => {
        if (data.redirect) push(data.redirect);
      };
    }
  }, [data.isOpen]);

  const setState = useEffectEvent((next: SetStateAction<z.output<T>>) => {
    if (!data.isOpen) throw new Error("You can't set state on a closed modal");

    const nextState = typeof next === "function" ? next(data.state) : next;
    dispatch(updateAction(nextState));
  });

  const setIsOpen = useEffectEvent(
    (open: boolean, initialState: z.output<T> = {}, redirectBack = false) => {
      if (open) {
        const next = safeParse(initialState);

        if (next.success) {
          const redirect =
            redirectBack && query.action ? window.location.href : null;
          dispatch(openAction(next.data, redirect));
        }
        return;
      }

      dispatch(closeAction());
    }
  );

  if (!data.isOpen)
    return {
      isOpen: false,
      setState,
      setIsOpen,
      modalProps: null,
    };

  return {
    ...data,
    setState,
    setIsOpen,
    modalProps: {
      ...data.state,
      setState,
      setIsOpen,
    },
  };
};

export type ModalProps<T extends z.AnyZodObject> = NonNullable<
  ReturnType<typeof useModal<T>>["modalProps"]
>;
