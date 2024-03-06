import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import userDP from "../assets/userDP.png";


function UserProfile() {
  const [userData, setuserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const fullName = `${userData.firstName} ${userData.lastName}`;

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");
  let local_refreshToken = localStorage.getItem("refreshToken");

  const userApiCall = () => {
    axios
      .get("http://localhost:8000/api/me", {
        headers: {
          genericvalue: "agent",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        setuserData(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.error("--", error.message);
      });
  };

  useEffect(() => {
    userApiCall();
    setInterval(() => {
      axios.post("http://localhost:8000/api/refresh-token", local_refreshToken);
    }, 3600000);
  }, []);

  const handleSubmit = () => {
    const details = {
      firstName: firstName,
      lastName: lastName,
      file: { userDP },
    };

    axios
      .put("http://localhost:8000/api/me/update-user", details, {
        headers: {
          genericvalue: "agent",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        {
          console.log("respnose", response);
        }
      })
      .catch((error) => {
        console.error("**", error.message);
      });
    userApiCall();

    setIsEditing((prev) => !prev);
  };

  return (
    <div>
      <UserNavbar />
      <div className="flex ">
        <UserSidebar fullName={fullName} />
        <div className="flex flex-col p-6 gap-4 items-center w-full">
          <div className="ml-3 mb-3 h-40 w-40 rounded-full bg-[#343a40]">
            <img src={userDP} alt="dp" height={100} w={100} />
          </div>
          <Paper elevation={2} className="h-11 rounded-md w-full md:w-[48%]">
            {isEditing ? (
              <input
                type="text"
                defaultValue={userData.firstName}
                className="w-full h-full border border-blue-400 px-3 rounded-md"
                onChange={(e) => setFirstName(e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={userData.firstName}
                className="w-full text-center h-full outline-none"
                readOnly
              />
            )}
          </Paper>
          <Paper elevation={2} className="h-11 rounded-md w-full md:w-[48%]">
            {isEditing ? (
              <input
                type="text"
                defaultValue={userData.lastName}
                className="w-full h-full  border border-blue-400 px-3 rounded-md"
                onChange={(e) => setLastName(e.target.value)}
              />
            ) : (
              <input
                type="text"
                defaultValue={userData.lastName}
                className="w-full h-full text-center outline-none"
                readOnly
              />
            )}
          </Paper>{" "}
          <Paper elevation={2} className="h-11 rounded-md w-full md:w-[48%]">
            <input
              type="text"
              defaultValue={userData.email}
              className="w-full h-full text-center outline-none"
              readOnly
            />
          </Paper>
          <Paper elevation={2} className="h-11 rounded-md w-full md:w-[48%]">
            <input
              type="text"
              defaultValue={userData.role}
              className="w-full h-full text-center outline-none"
              readOnly
            />
          </Paper>
          {isEditing ? (
            <button
              className="bg-[#007bff] text-white px-3 py-1 rounded-sm"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-[#007bff] text-white px-3 py-1 rounded-sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
