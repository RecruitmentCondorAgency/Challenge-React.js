import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  label?: string;
  required?: boolean;
}

const Field: React.FC<Props> = ({label, children, required}) => (
  <label className="flex flex-col gap-1">
    {label && (
      <strong className="capitalize">
        {label}
        {required && <span className="pl-1 text-red-600">*</span>}
      </strong>
    )}
    {children}
  </label>
);

export default Field;
