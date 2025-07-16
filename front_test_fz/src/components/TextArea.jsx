import React from "react";

const TextArea = ({
  name,
  value,
  onChange,
  label,
  className,
  rows = 3,
  required = false,
  placeholder,
}) => (
  <div className="relative mb-2">
    {label && (
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
    )}
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`border rounded-lg px-4 py-2 w-full ${className || ""}`}
      rows={rows}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default TextArea;