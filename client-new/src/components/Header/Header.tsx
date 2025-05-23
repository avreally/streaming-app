import "./Header.css";
import { User } from "../User/User";
import { Link } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts";

const baseUrl = "http://localhost:3001";

export const Header = () => {
  const { user } = useContext(UserContext);
  const [buttonName, setButtonName] = useState("Sign in with GitHub");
  const [uri, setUri] = useState("/signin");

  useEffect(() => {
    if (user) {
      setButtonName("Sign Out");
      setUri("/signout");
    }
  }, [user]);

  return (
    <nav className="nav">
      <div className="wrapper">
        <User />
        <Link to={baseUrl + uri} className="button">
          {buttonName}
        </Link>
      </div>
      <Link to="/">
        <h1 className="header">Streaming App</h1>
      </Link>
    </nav>
  );
};
