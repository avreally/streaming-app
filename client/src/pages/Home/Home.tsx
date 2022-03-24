import React, { useEffect, useState } from "react";
import "./Home.css";
import ListOfFavourites from "../../components/ListOfFavourites/ListOfFavourites";
import SearchForm from "../../components/SearchForm/SearchForm";
import Button from "../../components/Button/Button";
import axios from "axios";

function Home() {
  const [authorizeButtonName, setAuthorizeButtonName] = useState(
    "Sign in with GitHub"
  );
  const [userData, setUserData] = useState();
  const baseUrl = "http://localhost:3001";

  // Request to server to get user data
  useEffect(() => {
    axios.get(`${baseUrl}/me`).then((response) => {
      console.log("response data", response.data);
      setUserData(response.data);
      setAuthorizeButtonName("Sign out");
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
    <div className="App">
      <h1>Streaming app</h1>
      {userData === undefined ? (
        <Button
          className="SignInButton"
          buttonName={authorizeButtonName}
          onClick={handleSignIn}
        />
      ) : (
        <Button
          className="SignOutButton"
          buttonName={authorizeButtonName}
          onClick={handleSignOut}
        />
      )}
      <SearchForm className="SearchForm" placeholder="Search" />
      <ListOfFavourites className="ListOfFavourites" />
    </div>
  );
}

export default Home;
