import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import AllItems from "../../components/AllItems/AllItems";
import Navbar from "../../components/Navbar/Navbar";
import UserGreeting from "../../components/UserGreeting/UserGreeting";
import Button from "../../components/Button/Button";

function Home() {
  const [authorizeButtonName, setAuthorizeButtonName] = useState(
    "Sign in with GitHub"
  );
  const [userData, setUserData] = useState();
  const [itemsData, setItemsData] = useState();
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
          // console.log("response data", response.data);
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

  // Moved from the SearchForm component to make the Home component solely
  // responsible for making server requests and handling songs data
  // Request to the server, passing user search request
  const getSong = (userSearchRequest: string) => {
    return axios
      .get(`${baseUrl}/items?query=${userSearchRequest}`)
      .then((response) => {
        setItemsData(response.data);
      });
  };

  const handleSignIn = () => {
    console.log("clicked to sign in");
    window.location.href = `${baseUrl}/login`;
  };

  const handleSignOut = () => {
    console.log("clicked to sign out");
    window.location.href = `${baseUrl}/logout`;
  };

  return (
    <div className="app">
      <Navbar getSong={getSong} />
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
          <div>My favourites</div>
          <div>All music</div>
        </div>
        <div className="mainSection">
          {itemsData !== undefined ? (
            <AllItems className="allItems" itemsData={itemsData} />
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default Home;
