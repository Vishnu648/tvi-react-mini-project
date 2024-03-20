import React from "react";
import UpdatePassword from "../components/modals/UpdatePassword";
import { ToastContainer, toast } from "react-toastify";
import showToastMessage from "../components/ToastMessager";

function UserSidebar({ fullName, optionSetter }) {
  return (
    <div className="w-[225px] bg-[#212529] relative h-[92vh]">
      <div className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal ">
        <p className="hover:text-white" onClick={() => optionSetter("store")}>
          Store
        </p>
      </div>{" "}
      <div className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal ">
        <p className="hover:text-white" onClick={() => optionSetter("profile")}>
          Profile
        </p>
      </div>
      <div className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal ">
        {/* <p className="hover:text-white">Update password</p> */}
        <UpdatePassword showToastMessage={showToastMessage} />
      </div>
      <div className="text-[#818588] bg-[#343a40] absolute bottom-0 flex flex-col w-full h-[67.2px] p-3">
        <p className="font-medium">Logged in as:</p>
        <h2>{fullName}</h2>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserSidebar;
