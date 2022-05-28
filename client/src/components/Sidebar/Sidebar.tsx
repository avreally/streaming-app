import "./Sidebar.css";
import UserGreeting from "../UserGreeting/UserGreeting";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

type SidebarProps = {
  baseUrl: string;
};

const Sidebar = ({ baseUrl }: SidebarProps) => {
  const [authorizeButtonName, setAuthorizeButtonName] = useState(
    "Sign in with GitHub"
  );
  const [userData, setUserData] = useState();

  // Request to server to get user data
  useEffect(() => {
    axios
      .get(`${baseUrl}/me`, {
        validateStatus: () => {
          return true;
        },
      })
      .then((response) => {
        // check response status, if !== 200 return
        if (response.status === 200) {
          setUserData(response.data);
          setAuthorizeButtonName("Sign out");
        }
      })
      .catch();
  }, []);

  const handleSignIn = () => {
    window.location.href = `${baseUrl}/login`;
  };

  const handleSignOut = () => {
    window.location.href = `${baseUrl}/logout`;
  };
  return (
    <div className="sidebar">
      <UserGreeting className="userGreeting" userData={userData} />
      {userData === undefined ? (
        <Button
          className="signInButton"
          buttonName={authorizeButtonName}
          onClick={handleSignIn}
        />
      ) : (
        <div className="greeting">
          <Button
            className="signOutButton"
            buttonName={authorizeButtonName}
            onClick={handleSignOut}
          />
        </div>
      )}
      <Link to="favourites">
        <div>My favourites</div>
      </Link>
      {/*<Link to="all-music" reloadDocument>*/}
      <Link to="all-music">
        <div>All music</div>
      </Link>
    </div>
  );
};

export default Sidebar;
