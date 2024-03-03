import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import ProfileMenu from "../components/ProfileMenu";

function Navbar() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log(searchText);
  };

  return (
    <div className="w-screen h-14 bg-[#343a40] flex items-center text-white px-5">
      <h3 className="w-[250px]">UMS</h3>
      <div className=" w-screen flex items-center justify-end md:justify-between">
        <div className="p-2 hidden md:flex">
          <RxHamburgerMenu />
        </div>
        <div className="flex gap-3 md:gap-7 items-center mr-2">
          <div className="items-center md:flex hidden">
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
          </div>
          <ProfileMenu />
          <div className="p-2 md:hidden cursor-pointer">
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
