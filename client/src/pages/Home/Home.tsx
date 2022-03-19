import React from "react";
import "./Home.css";
import ListOfFavourites from "../../components/ListOfFavourites/ListOfFavourites";
import SearchForm from "../../components/SearchForm/SearchForm";

function Home() {
  return (
    <div className="App">
      <h1>Streaming app</h1>
      <SearchForm className="SearchForm" placeholder="Search" />
      <ListOfFavourites className="ListOfFavourites" />
    </div>
  );
}

export default Home;
