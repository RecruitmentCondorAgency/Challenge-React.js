import React, { ReactNode, MouseEvent } from "react";

// Define a type for the button type
type ButtonType = "button" | "submit" | "reset";

// Interface for ButtonProps
interface ButtonProps {
  type?: ButtonType;
  text?: string;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  children?: ReactNode;
}

// Button component
const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      // Styling classes for the button using Tailwind CSS
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Render either the provided text or the children */}
      {text || children}
    </button>
  );
};

export default Button;
