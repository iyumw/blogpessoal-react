import { ChangeEvent } from "react";

interface PasswordFieldProps {
    label: string;
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }
  
  export function PasswordField({
    label,
    id,
    name,
    placeholder,
    value,
    onChange,
  }: PasswordFieldProps) {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-gray-600 font-semibold">
          {label}
        </label>
        <input
          type="password"
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
  