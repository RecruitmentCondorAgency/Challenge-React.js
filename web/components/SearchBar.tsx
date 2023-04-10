/* eslint-disable react/display-name */
import React, { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export interface Props {
  autoFocus?: boolean;
  delay?: number;
  onSearch?: (search?: string) => void;
  required?: boolean;
  value?: string;
}

const SearchBar: React.FC<Props> = ({autoFocus, delay = 300, onSearch, required, value: val, ...props}) => {
  const input = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState<number | undefined>();
  const [value, setValue] = useState(val);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
    if (onSearch) {
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        onSearch(e.target.value);
      }, delay));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (onSearch && val !== value) {
      clearTimeout(timer);
      onSearch(value);
    }
  };

  useEffect(() => {
    setValue(val);
  }, [val]);

  useEffect(() => {
    // force focus if is empty and has autoFocus
    if (autoFocus && input.current && !value) input.current.focus();
  });

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        autoFocus={autoFocus}
        className="grow border-l border-y border-gray-400 bg-white rounded-l outline-primary-500 px-2 py-1"
        onChange={handleChange}
        required={required}
        value={value}
        {...props}
      />
      <button className="rounded-r bg-primary-500 hover:bg-primary-400 text-white px-2 py-1">
        <Icon type="search" className="h-4" />
      </button>
    </form>
  );
};

export default SearchBar;
