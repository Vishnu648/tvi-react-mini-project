import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

function SearchBar() {
  const tokens = useSelector((state) => state.token.access_token);
  let local_accessToken = localStorage.getItem("accessToken");
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/users?search=${searchText}`, {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((res) => setSearchData(res.data.users))
      .catch((err) => console.error("--", err));
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search for..."
        className="h-[38px] w-[220px] text-black outline-none p-4 rounded-s-[4px] "
      />
      <button
        onClick={handleSearch}
        className="bg-[#007bff] h-[38px] px-3 py-[6px] rounded-r-[4px]"
      >
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBar;
