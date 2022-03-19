import "./Button.css";

type ButtonProps = {
  className: string;
  buttonName: string;
  onClick?: () => void;
};

const Button = ({ className, buttonName, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default Button;
