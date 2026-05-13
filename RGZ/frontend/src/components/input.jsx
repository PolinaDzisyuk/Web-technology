import React from 'react';

const Input = ({ label, type = 'text', name, placeholder, value, onChange, required = false }) => {
  return (
    <div className="input-group">
      {label && <label>{required ? `*${label}` : label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="dark-text-input"
      />
    </div>
  );
};

export default Input;