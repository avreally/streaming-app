import "./Navbar.css";
import SearchForm from "../SearchForm/SearchForm";
import React from "react";

type NavbarProps = {
  getSong: (query: string) => void;
  // userData: UserType | undefined;
  // authorizeButtonName: string;
};

const Navbar = ({ getSong }: NavbarProps) => {
  const baseUrl = "http://localhost:3001";

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
