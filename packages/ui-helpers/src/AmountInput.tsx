import {
  ComponentProps,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { formatUnits, parseUnits } from "viem";
import { cn, clamp, E } from "helpers";
import cx from "clsx";

export const AmountInput = ({
  value,
  decimals,
  onChange,
  max,
  min = 0n,
  className,
  maxButtonClassName,
  setIsMaxClicked,
  variant = "default",
  ...props
}: Omit<ComponentProps<"input">, "value" | "onChange" | "max" | "min"> & {
  maxButtonClassName?: string;
  decimals?: number | string;
  onChange?: (value: bigint) => void;
  value?: bigint;
  max?: bigint;
  min?: bigint;
  setIsMaxClicked?: Dispatch<SetStateAction<boolean>>;
  variant?: "default" | "error" | "info";
}) => {
  const decimalsUnit = parseInt(String(decimals ?? 18));
  const formattedValue = formatUnits(value ?? 0n, decimalsUnit);
  const [internalValueState, setValue] = useState(formattedValue);

  const isInternalSync = parseUnits(internalValueState, decimalsUnit) === value;
  useEffect(() => {
    if (isInternalSync) return;
    setValue(formattedValue);
  }, [formattedValue, isInternalSync]);

  useEffect(() => {
    setValue((prev) => {
      const parsed = parseUnits(prev, decimalsUnit);
      const amount = clamp(parsed, min, max ?? parsed);
      return formatUnits(amount, decimalsUnit);
    });
  }, [max, min, decimalsUnit]);

  return (
    <div
      className={cx(
        "flex w-full tracking-wider font-bold py-2 px-4 text-sm md:text-base leading-5 text-gray-900 focus:ring-1 border-2 border-pink-300 rounded bg-pink-200 text-black focus-visible:outline-none",
        {
          "bg-pink-700": variant === "error",
          "bg-purple-200": variant === "info",
        },
      )}
    >
      <input
        value={internalValueState}
        className={cx(
          "w-full border-none bg-pink-200 focus-visible:outline-none",
          {
            "bg-pink-700": variant === "error",
            "bg-purple-200": variant === "info",
          },
          className,
        )}
        onChange={(e) => {
          const inputValue = e.target.value.replace(/^(0+)(?=[1-9])/, "");
          if (inputValue.split(".").length > 2) {
            return;
          }
          const [error, parsed] = E.try(() =>
            parseUnits(inputValue, decimalsUnit),
          );

          if (error) {
            return;
          }
          let amount = parsed;
          if (max || min) {
            amount = clamp(amount, min ?? 0n, max ?? amount);
          }
          setValue(inputValue);
          if (amount !== value) {
            onChange?.(amount);
          }
        }}
        onBlur={() => {
          const normalizedValue = formatUnits(value ?? 0n, decimalsUnit);
          if (normalizedValue !== internalValueState) {
            setValue(normalizedValue);
          }
        }}
        inputMode="decimal"
        type="text"
        pattern="[0-9]*(.[0-9]+)?"
        role="spinbutton"
        autoComplete="off"
        autoCorrect="off"
        {...props}
      />
      {max !== undefined && (
        <button
          className={cn(
            "py-2 px-2.5 leading-none rounded-md bg-pink-400 text-black-900 text-xs md:text-sm tracking-wider font-normal",
            maxButtonClassName,
          )}
          onClick={(e) => {
            e.preventDefault();
            setValue(formatUnits(max ?? 0n, decimalsUnit));
            onChange?.(max ?? 0n);
            setIsMaxClicked && setIsMaxClicked(true);
          }}
        >
          Max.
        </button>
      )}
    </div>
  );
};
