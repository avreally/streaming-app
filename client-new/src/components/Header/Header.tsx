import { Link } from "@tanstack/react-router";
import "./Header.css";

const baseUrl = "http://localhost:3001";

export const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <h1>Streaming App</h1>
      </Link>
      <Link to={`${baseUrl}/signin`}>Sign In with GitHub</Link>
    </div>
  );
};
