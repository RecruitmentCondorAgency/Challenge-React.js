import { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="input"
      >
        {label}
      </label>
      <input
        id="input"
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
