import "./Header.css";
import { User } from "../User/User";
import { Link } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts";

const baseUrl = "http://localhost:3001";

export const Header = () => {
  const { user } = useContext(UserContext);
  const [buttonName, setButtonName] = useState("Sign In with GitHub");
  const [uri, setUri] = useState("/signin");

  useEffect(() => {
    if (user !== undefined) {
      setButtonName("Sign Out");
      setUri("/signout");
    }
  }, [user]);

  return (
    <nav className="header">
      <Link to="/">
        <h1>Streaming App</h1>
      </Link>
      <User />
      <Link to={baseUrl + uri}>{buttonName}</Link>
    </nav>
  );
};
