"use client";

import { useEffect, useState } from "react";
import ReactSelect, { type SingleValue } from "react-select";
import { clsx } from "clsx";
import css from "./Select.module.css";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  wide?: boolean;
  narrow?: boolean;
  disabled?: boolean;
  disabledValues?: string[];
  instanceId: string;
  placeholder?: string;
  "aria-label"?: string;
};

export function Select({
  options,
  value,
  onChange,
  wide,
  narrow,
  disabled,
  disabledValues,
  instanceId,
  placeholder = "Оберіть…",
  "aria-label": ariaLabel,
}: SelectProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const selected = options.find((item) => item.value === value) ?? null;

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  return (
    <ReactSelect
      className={clsx(css.root, wide && css.wide, narrow && css.narrow)}
      classNamePrefix="nmt-select"
      instanceId={instanceId}
      inputId={instanceId}
      options={options}
      value={selected}
      onChange={(option: SingleValue<SelectOption>) => onChange(option?.value ?? "")}
      isDisabled={disabled}
      isOptionDisabled={(option) => Boolean(disabledValues?.includes(option.value))}
      isSearchable={false}
      isClearable={false}
      placeholder={placeholder}
      aria-label={ariaLabel}
      menuPlacement="auto"
      menuPortalTarget={portalTarget ?? undefined}
      theme={(selectTheme) => ({
        ...selectTheme,
        borderRadius: 12,
        colors: {
          ...selectTheme.colors,
          primary: "var(--green)",
          primary25: "var(--green-hover)",
          primary50: "var(--green-soft)",
          neutral0: "var(--surface)",
          neutral5: "var(--surface-muted)",
          neutral10: "var(--line)",
          neutral20: "var(--border)",
          neutral30: "var(--green)",
          neutral40: "var(--muted)",
          neutral50: "var(--muted)",
          neutral60: "var(--ink)",
          neutral70: "var(--ink)",
          neutral80: "var(--ink)",
          neutral90: "var(--ink)",
        },
      })}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 80 }),
        control: (base, state) => ({
          ...base,
          minHeight: 40,
          borderRadius: 12,
          borderColor: state.isFocused ? "var(--green)" : "var(--border)",
          backgroundColor: state.isDisabled ? "var(--surface-muted)" : "var(--surface)",
          boxShadow: state.isFocused ? "0 0 0 3px var(--green-ring)" : "none",
          cursor: state.isDisabled ? "not-allowed" : "pointer",
          "&:hover": {
            borderColor: "var(--green)",
          },
        }),
        menu: (base) => ({
          ...base,
          marginTop: 4,
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "var(--surface)",
          boxShadow: "6px 8px 0 var(--shadow)",
        }),
        menuList: (base) => ({ ...base, padding: 0, backgroundColor: "var(--surface)" }),
        option: (base, state) => ({
          ...base,
          padding: "10px 12px",
          fontSize: 16,
          cursor: state.isDisabled ? "not-allowed" : "pointer",
          opacity: state.isDisabled ? 0.45 : 1,
          backgroundColor: state.isSelected
            ? "var(--green-soft)"
            : state.isFocused && !state.isDisabled
              ? "var(--green-hover)"
              : "var(--surface)",
          color: "var(--ink)",
          fontWeight: state.isSelected ? 500 : 400,
          ":active": {
            backgroundColor: state.isDisabled ? "var(--surface)" : "var(--green-soft)",
          },
        }),
        singleValue: (base) => ({ ...base, color: "var(--ink)", margin: 0 }),
        placeholder: (base) => ({ ...base, color: "var(--muted)", margin: 0 }),
        input: (base) => ({
          ...base,
          color: "transparent",
          margin: 0,
          caretColor: "transparent",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "var(--ink)",
          padding: "0 10px",
        }),
        indicatorSeparator: () => ({ display: "none" }),
      }}
    />
  );
}

export { css as selectCss };
