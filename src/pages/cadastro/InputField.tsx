import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  label,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-gray-600 font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="border-2 border-pink-200 rounded-lg p-3 focus:outline-none focus:border-blush-100"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
