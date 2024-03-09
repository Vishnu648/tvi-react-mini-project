import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

function SearchBar() {
  let local_accessToken = localStorage.getItem("accessToken");
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/user/${searchText}`, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message));
  };

  return (
    <form onSubmit={handleSearch} className="items-center md:flex hidden">
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
