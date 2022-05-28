import "./SearchForm.css";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import React from "react";

type SearchFormProps = {
  className: string;
  onSubmit: (query: string) => void;
  placeholder: string;
};

const SearchForm = ({ className, onSubmit, placeholder }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? ""
  );

  // Putting user request to URL
  const updateSearchParams = (query: string) => {
    if (query) {
      setSearchParams({ query });
      console.log("search params", searchParams.get("query"));
    } else {
      setSearchParams({});
    }
  };

  const searchForSong = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearchParams(searchQuery);
    onSubmit(searchQuery); // call onSubmit function that is passed in props from the parent component
  };

  return (
    <form onSubmit={searchForSong} className={className}>
      <div className="searchForm__div">
        <InputField
          className={className}
          placeholder={placeholder}
          type="search"
          setSearchQuery={setSearchQuery}
          value={searchQuery}
        />
        <Button buttonName="Search" className="button searchButton" />
      </div>
    </form>
  );
};

export default SearchForm;
