import "./InputField.css";

type InputFieldProps = {
  className: string;
  type: string;
  placeholder: string;
};

const InputField = ({ className, type, placeholder }: InputFieldProps) => {
  return <input type={type} className={className} placeholder={placeholder} />;
};

export default InputField;
