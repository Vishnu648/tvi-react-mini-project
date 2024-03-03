import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import ProfileMenu from "../components/ProfileMenu";

function UserNavbar() {
  return (
    <div className="w-screen h-14 bg-[#343a40] flex items-center text-white px-5">
      <h3 className="h-[30px] w-[225px] mr-4 flex items-center">First Last</h3>
      <div className="w-screen flex items-center justify-end lg:justify-between">
        <div className="p-2 hidden lg:flex cursor-pointer">
          <RxHamburgerMenu />
        </div>
        <div className="flex gap-7 items-center mr-2">
          <ProfileMenu />
        </div>
        <div className="p-2 lg:hidden cursor-pointer">
          <RxHamburgerMenu />
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
