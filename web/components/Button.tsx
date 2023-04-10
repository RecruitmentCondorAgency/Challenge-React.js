import React, { ButtonHTMLAttributes } from "react";
import { classMerge } from "../utils/class-converter";
import Icon, { IconType } from "./Icon";

type Color = 'primary' | 'white';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'color'> {
  className?: unknown;
  color?: Color;
  icon?: IconType;
  loading?: boolean;
}

const Button: React.FC<Props> = ({children, className, color, disabled: d, icon, loading, ...props}) => {
  const disabled = d || loading;
  const classes = classMerge(
    "px-4 py-2 flex content-center items-center justify-center gap-2 rounded",
    className,
    colors[disabled ? 'disabled' : 'enabled'][color || 'white'],
  );
  return(
    <button {...props} className={classes} disabled={disabled}>
      {children}
      {loading ? <Icon type="loader" className="h-3 -mb-1" /> : icon && <Icon type={icon}  className="h-3 -mb-1" />}
    </button>
  );
};

const colors: Record<'enabled'|'disabled', Record<Color, string>> = {
  enabled: {
    primary: "bg-primary-600 hover:bg-primary-500 text-white",
    white: "bg-white hover:bg-gray-100 text-black border border-gray-400",
  },
  disabled: {
    primary: "bg-gray-500 text-white",
    white: "bg-white text-gray-500 border border-gray-400",
  },
};


export default Button;
