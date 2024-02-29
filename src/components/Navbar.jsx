import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  return (
    <div className="w-screen h-14 bg-[#343a40] flex items-center text-white px-5">
      <h3 className="w-[250px]">UMS</h3>
      <div className="border w-screen flex items-center justify-between">
        <div className="p-2">
        <RxHamburgerMenu />
        </div>
        <div className="flex">
          <input type="text" placeholder="search"/>
          <p>logo</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
