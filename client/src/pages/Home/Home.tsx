import React, { useState } from "react";
import "./Home.css";
import ListOfFavourites from "../../components/ListOfFavourites/ListOfFavourites";
import SearchForm from "../../components/SearchForm/SearchForm";
import Button from "../../components/Button/Button";
import axios from "axios";

function Home() {
  // const [loginButtonName, setLoginButtonName] = useState("Sign in with GitHub");
  const baseUrl = "http://localhost:3001";

  // Request to server to get user data
  const getUserData = () => {
    return axios.get(`${baseUrl}/me`).then((response) => {
      console.log("response data", response.data);
      return response.data;
    });
  };

  getUserData();

  const handleLogin = () => {
    console.log("clicked");
    window.location.href = `${baseUrl}/login`;
  };

  return (
    <div className="App">
      <h1>Streaming app</h1>
      <Button
        className="LoginButton"
        buttonName="Login"
        onClick={handleLogin}
      />
      <SearchForm className="SearchForm" placeholder="Search" />
      <ListOfFavourites className="ListOfFavourites" />
    </div>
  );
}

export default Home;
