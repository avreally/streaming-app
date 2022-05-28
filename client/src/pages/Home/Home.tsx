import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import UserGreeting from "../../components/UserGreeting/UserGreeting";
import Button from "../../components/Button/Button";
import SongsListContext from "../../contexts/SongsListContext";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [authorizeButtonName, setAuthorizeButtonName] = useState(
    "Sign in with GitHub"
  );
  const [userData, setUserData] = useState();
  const [, setItemsData] = useContext(SongsListContext);
  const baseUrl = "http://localhost:3001";

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

  useEffect(() => {
    axios.get(`${baseUrl}/items`).then((response) => {
      setItemsData(response.data);
    });
  }, []);

  const handleSignIn = () => {
    window.location.href = `${baseUrl}/login`;
  };

  const handleSignOut = () => {
    window.location.href = `${baseUrl}/logout`;
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main">
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
          <Link to="all-music" reloadDocument>
            <div>All music</div>
          </Link>
        </div>
        <div className="mainSection">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Home;
