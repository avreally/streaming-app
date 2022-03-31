import "./InputField.css";
import React from "react";

type InputFieldProps = {
  className: string;
  type: string;
  placeholder: string;
  setSearchQuery: (p: string) => void;
};

const InputField = ({
  className,
  type,
  placeholder,
  setSearchQuery,
}: InputFieldProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
};

export default InputField;
