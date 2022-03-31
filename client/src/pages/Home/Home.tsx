import React, { useEffect, useState } from "react";
import "./Home.css";
import ListOfFavourites from "../../components/ListOfFavourites/ListOfFavourites";
import SearchForm from "../../components/SearchForm/SearchForm";
import Button from "../../components/Button/Button";
import axios from "axios";
import AllItems from "../../components/AllItems/AllItems";
import UserGreeting from "../../components/UserGreeting/UserGreeting";
// import { Simulate } from "react-dom/test-utils";
// import error = Simulate.error;

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
          console.log("response data", response.data);
          setUserData(response.data);
          setAuthorizeButtonName("Sign out");
        }
      })
      .catch();
  }, []);

  useEffect(() => {
    axios.get(`${baseUrl}/items`).then((response) => {
      console.log("items data", response.data);
      setItemsData(response.data);
    });
  }, []);

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
      <h1>Streaming app</h1>
      {userData === undefined ? (
        <Button
          className="signInButton"
          buttonName={authorizeButtonName}
          onClick={handleSignIn}
        />
      ) : (
        <div>
          <UserGreeting className="userGreeting" userData={userData} />
          <Button
            className="signOutButton"
            buttonName={authorizeButtonName}
            onClick={handleSignOut}
          />
        </div>
      )}
      <SearchForm className="searchForm" placeholder="Enter song name" />
      <ListOfFavourites className="listOfFavourites" />
      {itemsData !== undefined ? (
        <AllItems className="allItems" itemsData={itemsData} />
      ) : null}
    </div>
  );
}

export default Home;
