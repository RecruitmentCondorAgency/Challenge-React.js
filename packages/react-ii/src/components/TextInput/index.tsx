import React, { ChangeEvent } from "react";

// Props for the TextInput component
interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

// TextInput component for rendering a text input field
const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  onChange,
}) => {
  // Handler function for input change events
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="mb-4">
      {/* Label for the input field */}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      {/* Input field with styling classes using Tailwind CSS */}
      <input
        id={name}
        name={name}
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
    </div>
  );
};

export default TextInput;
