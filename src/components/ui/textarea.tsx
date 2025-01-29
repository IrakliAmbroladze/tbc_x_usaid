import React from "react";

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      rows={5}
    />
  );
};
