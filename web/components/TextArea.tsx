/* eslint-disable react/display-name */
import React, { KeyboardEventHandler, TextareaHTMLAttributes } from "react";
import Field from "./Field";
import { classMerge } from "../utils/class-converter";

// TextArea KeyDown Event Handler
type TAKDEHandler = KeyboardEventHandler<HTMLTextAreaElement> | undefined;

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  onEnter: TAKDEHandler;
}

const TextArea: React.FC<Props> = ({className, label, onEnter, onKeyDown, ...props}) => (
  <Field label={label}>
    <textarea
      className={classMerge("border border-gray-400 rounded outline-blue-500 px-2 py-1", className)}
      onKeyDown={onKeyDownHandler(onEnter, onKeyDown)}
      {...props}
    />
  </Field>
);

function onKeyDownHandler(onEnter: TAKDEHandler, onKeyDown: TAKDEHandler): TAKDEHandler {
  if (!onEnter && !onKeyDown) return undefined;
  return (event) => {
    if (onEnter && event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      onEnter(event);
    } else if (onKeyDown) {
      onKeyDown(event);
    }
  };
}

export default TextArea;
