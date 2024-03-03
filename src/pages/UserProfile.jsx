import React from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

function UserProfile() {
  return (
    <div className="">
      <UserNavbar />
      <div className="flex w-screen">
        <UserSidebar />
        <div className="flex flex-col p-6">
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
