import React from "react";
import SearchInput from "./SearchInput";
import DriversList from "./DriversList";
import "./SearchBox.css";
const SearchBox = () => {
  return (
    <div id="search-box" className="pd1">
      <SearchInput />
      <DriversList />
    </div>
  );
};

export default SearchBox;
