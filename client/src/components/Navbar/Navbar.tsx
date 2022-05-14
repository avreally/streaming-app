import "./Navbar.css";
import SearchForm from "../SearchForm/SearchForm";
import React from "react";
import { UserType } from "../../../types";
import Button from "../Button/Button";
import UserGreeting from "../UserGreeting/UserGreeting";

type NavbarProps = {
  getSong: (query: string) => void;
  userData: UserType | undefined;
  authorizeButtonName: string;
};

const Navbar = ({ getSong, userData, authorizeButtonName }: NavbarProps) => {
  const baseUrl = "http://localhost:3001";

  const handleSignIn = () => {
    console.log("clicked to sign in");
    window.location.href = `${baseUrl}/login`;
  };

  const handleSignOut = () => {
    console.log("clicked to sign out");
    window.location.href = `${baseUrl}/logout`;
  };

  return (
    <nav>
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
      <SearchForm
        className="searchForm"
        placeholder="Enter song name"
        onSubmit={getSong}
      />
    </nav>
  );
};

export default Navbar;
