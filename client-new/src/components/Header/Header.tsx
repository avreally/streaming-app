import "./Header.css";
import { User } from "../User/User";
import { Link } from "@tanstack/react-router";

const baseUrl = "http://localhost:3001";

export const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <h1>Streaming App</h1>
      </Link>
      <User />
      <Link to={`${baseUrl}/signin`}>Sign In with GitHub</Link>
    </div>
  );
};
