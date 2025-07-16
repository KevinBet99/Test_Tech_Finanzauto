import React from "react";

const Select = ({
  name,
  value,
  onChange,
  options = [],
  label,
  className,
  required = false,
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
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`border rounded-lg px-4 py-2 w-full ${className || ""}`}
      required={required}
    >
      <option value="">Seleccione una opción</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Select;