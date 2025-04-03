import "./Navbar.css";
import SearchForm from "../SearchForm/SearchForm";
import React, { useContext } from "react";
import axios from "axios";
import SongsListContext from "../../contexts/SongsListContext";

const Navbar = () => {
  const [, setItemsData] = useContext(SongsListContext);

  const baseUrl = "http://localhost:3001";

  // Request to the server, passing user search request
  const getSong = (userSearchRequest: string) => {
    return axios
      .get(`${baseUrl}/items?query=${userSearchRequest}`)
      .then((response) => {
        setItemsData(response.data);
      });
  };

  return (
    <nav className="navbar">
      <SearchForm
        className="searchForm"
        placeholder="Enter song name"
        onSubmit={getSong}
      />
    </nav>
  );
};

export default Navbar;
