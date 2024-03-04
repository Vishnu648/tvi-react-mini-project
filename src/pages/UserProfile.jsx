import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";
import { useSelector } from "react-redux";

function UserProfile() {
  const [userData, setuserData] = useState([]);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");

  const userApiCall = () => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        setuserData(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
    console.log("api called");
  };

  useEffect(() => {
    userApiCall();
  }, []);

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
