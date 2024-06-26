import { RxHamburgerMenu } from "react-icons/rx";
import ProfileMenu from "../components/ProfileMenu";
import SearchBar from "./SearchBar";

function Navbar({ toogleSidebar, searchDataFunction, sidebarOption }) {
  return (
    <div className="w-screen h-14 bg-[#343a40] flex items-center text-white px-5">
      <h3 className="w-[250px]">UMS</h3>
      <div className=" w-screen flex items-center justify-end md:justify-between">
        <div
          className="p-2 hidden md:flex cursor-pointer"
          onClick={toogleSidebar}
        >
          <RxHamburgerMenu />
        </div>
        <div className="flex gap-3 md:gap-7 items-center mr-2">
          {sidebarOption == "dashboard" ? (
            <div className="items-center md:flex hidden">
              <SearchBar searchDataFunction={searchDataFunction} />
            </div>
          ) : (
            ""
          )}
          <ProfileMenu />
          <div className="p-2 md:hidden cursor-pointer" onClick={toogleSidebar}>
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
