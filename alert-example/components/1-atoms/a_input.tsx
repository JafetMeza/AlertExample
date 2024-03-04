import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import getMoneyString from "../../helpers/moneyService";
import useMounted from "../hooks/useMounted";
import { decimalNumbers } from "@/helpers/validators/regex";

export enum InputType {
  text = "text",
  number = "number",
  currency = "currency",
  date = "date",
  time = "time",
  password = "password",
  datetime_local = "datetime-local",
}

export interface InputMethodProps {
  value: string | null;
  name: string;
}

export interface InputProps {
  icon: string;
  placeholder: string;
  name: string;
  error: string;
  onKeyUp?({ value, name }: InputMethodProps): void;
  onErase?(): void;
  onEnter?(): void;
  onFocus?(): void;
  onBlur?(): void;
  onChange?({ value, name }: InputMethodProps): void;
  className?: string;
  type?: InputType;
  disabled?: boolean;
  defaultValue?: string;
  style?: React.CSSProperties;
  props?: React.PropsWithoutRef<any>;
  autoComplete?: boolean;
  min?: string;
  max?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      placeholder,
      onKeyUp = () => {},
      name,
      error,
      icon = "",
      type = InputType.text,
      onErase = () => {},
      onEnter = () => {},
      onFocus = () => {},
      onChange = () => {},
      disabled = false,
      onBlur = () => {},
      autoComplete = true,
      defaultValue = "",
      min = "",
      max = "",
    },
    ref
  ) => {
    const mounted = useMounted();
    const input = useRef<HTMLInputElement>(null);
    const [deleteButton, setDeleteButton] = useState(false);
    const [showError, setShowError] = useState(false);
    const [mutationObserver, setMutationObserver] =
      useState<MutationObserver>();

    /* #region  CONVERT MONEY CURRENCY */
    const localStringToNumber = (currencyString: string): string =>
      Number(String(currencyString).replace(/[^0-9.-]+/g, "")).toString();

    const onFocusCurrencyInput = (): void => {
      if (mounted && input.current) {
        if (input.current.value) {
          input.current.value = localStringToNumber(
            input.current.value
          ).toString();
        }
        input.current.select();
      }
    };

    const onBlurCurrencyInput = (): void => {
      if (mounted && input.current) {
        const value = getMoneyString(
          Number(localStringToNumber(input.current.value))
        );
        input.current.value = value;
      }
    };

    /* #endregion */

    useEffect(() => {
      if (mounted && input.current) {
        const mutationObserver = new MutationObserver(onMutation);
        mutationObserver.observe(input.current, { attributes: true });
        setMutationObserver(mutationObserver);
      }

      return () => {
        if (mounted && mutationObserver) mutationObserver.disconnect();
      };
    }, [mounted]);

    const onMutation = (
      mutationList: MutationRecord[],
      _: MutationObserver
    ): void => {
      mutationList.forEach((mutation) => {
        if (mutation.attributeName === "class" && input.current) {
          const valueOfClass = input.current.classList;
          if (valueOfClass.value.includes("is-danger") && error !== "") {
            setShowError(true);
          } else if (error !== "") setShowError(false);
        }
      });
    };

    useEffect(() => {
      if (input.current && input.current.value.length > 0) {
        setDeleteButton(true);
      }
    }, [input.current?.value]);

    const onClick = (): void => {
      if (input.current) {
        input.current.value = "";
        onKeyUp({ value: "", name: input.current.name });
        onErase();
        onChange({ value: "", name: input.current.name });
        setDeleteButton(false);
        input.current.focus();
      }
    };

    const onKeyUpInput = (key: string): void => {
      if (key === "Enter") onEnter();
    };

    const onChangeInput = (target: HTMLInputElement): void => {
      if (target.value.length > 0) {
        setDeleteButton(true);
        if (type === InputType.currency) {
          try {
            if (input.current) {
              const result = decimalNumbers.test(target.value);
              if (!result) target.value = "";
              const length = input.current.value.length;
              input.current.setSelectionRange(length, length);
            }
          } catch (error) {}
        }
      } else setDeleteButton(false);
      onKeyUp({ value: target.value, name: target.name });
    };

    const onFocusChildren = (): void => {
      onFocus();
      if (type === InputType.currency) onFocusCurrencyInput();
    };

    const onBlurChildren = (): void => {
      onBlur();
      if (type === InputType.currency) onBlurCurrencyInput();
    };

    useImperativeHandle(ref, () => input.current!);

    return (
      <>
        <div
          className={`control ${icon && "has-icons-left"} ${
            deleteButton && "has-icons-right"
          }`}
        >
          <input
            defaultValue={defaultValue}
            type={type === "currency" ? "text" : type}
            ref={input}
            name={name}
            min={min}
            max={max}
            className={`input ${className}`}
            placeholder={placeholder}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              onKeyUpInput(e.key)
            }
            onFocus={(e) => {
              e.target.select();
              onFocusChildren();
            }}
            onBlur={() => onBlurChildren()}
            onChange={(e) => {
              onChangeInput(e.target as HTMLInputElement);
              onChange({
                value: e.target?.value ?? "",
                name: input.current?.name ?? "",
              });
            }}
            disabled={disabled}
            autoComplete={autoComplete ? "on" : "new-password"}
          />
          {!disabled && deleteButton && (
            <span
              className="icon is-small is-right is-clickable"
              onClick={onClick}
            >
              <i className="fas fa-times" />
            </span>
          )}
          {icon && (
            <span className="icon is-small is-left">
              <i className={`fas fa-${icon}`} />
            </span>
          )}
        </div>
        {showError && <p className="help is-danger">{error}</p>}
      </>
    );
  }
);

export default Input;
