import "./Login.css";
import Button from "../../components/Button/Button";

const baseUrl = "http://localhost:3001";

const Login = () => {
  const handleLogin = () => {
    console.log("clicked");
    window.location.href = `${baseUrl}/login`;
  };

  return (
    <div>
      Login page
      <Button
        className="LoginButton"
        buttonName="Login"
        onClick={handleLogin}
      />
    </div>
  );
};

export default Login;
