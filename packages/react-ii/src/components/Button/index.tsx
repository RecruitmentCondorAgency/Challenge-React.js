import { ReactNode } from "react";

type buttonType = "button" | "submit" | "reset"

interface ButtonProps {
  type?: buttonType;
  onClick?: (e) => void;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
