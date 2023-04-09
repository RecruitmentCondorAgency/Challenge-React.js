/* eslint-disable react/display-name */
import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import Field from "./Field";
import { classMerge } from "../utils/class-converter";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<Props> = ({autoFocus, className, label, required, value, ...props}) => {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // force focus if is empty and has autoFocus
    if (autoFocus && input.current && !value) input.current.focus();
  });

  return (
    <Field label={label} required={required}>
      <input
        ref={input}
        autoFocus={autoFocus}
        className={classMerge("border border-gray-400 rounded outline-blue-500 px-2 py-1", className)}
        required={required}
        value={value}
        {...props}
      />
    </Field>
  );
};

export default Input;
