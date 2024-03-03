import React,{useState} from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";
import { useSelector } from "react-redux";

function UserProfile() {
  const [userData, setuserData] = useState([]);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");



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
