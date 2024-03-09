import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import userDP from "../assets/userDP.png";
import ImageUpload from "../components/ImageUpload";
import {
  set_Access_Tokken,
  set_Refresh_Token,
} from "../Redux/features/tokenSlice";

function UserProfile() {
  const [userData, setuserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [imagePath, setImagePath] = useState("");
  const fullName = `${userData.firstName} ${userData.lastName}`;

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");
  let local_refreshToken = localStorage.getItem("refreshToken");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const imageSetter = (path) => {
    setImagePath(path);
  };

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
        setImagePath(response.data.data.imageURL)
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("--", error.message);
      });
  };

  const toogleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  useEffect(() => {
    userApiCall();
    setInterval(() => {
      axios
        .post("http://localhost:8000/api/refresh-token", local_refreshToken)
        .then((res) => dispatch(set_Access_Tokken(res.data.refresh_token)))
        .catch((err) => err.message);
    }, 3600000);
  }, []);

  const handleSubmit = () => {
    const details = {
      firstName: firstName,
      lastName: lastName,
      imageURL: imagePath,
    };

    console.log(details);

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

  const handleCancel = () => {
    setIsEditing((prev) => !prev);
    console.log(imagePath)
  };

  return (
    <div>
      <UserNavbar toogleSidebar={toogleSidebar} />
      <div className="flex ">
        {sidebarIsOpen ? <UserSidebar fullName={fullName} /> : ""}
        <div className="flex flex-col p-6 gap-4 items-center flex-1">
          <div className="ml-3 mb-3 h-40 w-40 rounded-full bg-[#343a40]">
            <img
              src={imagePath ? imagePath : userDP}
              alt="dp"
              height={100}
              w={100}
              className="rounded-full"
            />
          </div>
          {isEditing ? <ImageUpload imageSetter={imageSetter} /> : ""}
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
          </Paper>
          <Paper elevation={2} className="h-11 rounded-md w-full md:w-[48%]">
            {isEditing ? (
              <input
                type="text"
                defaultValue={userData.id}
                className="w-full h-full text-center outline-none opacity-60"
                readOnly
              />
            ) : (
              <input
                type="text"
                defaultValue={userData.id}
                className="w-full h-full text-center outline-none"
                readOnly
              />
            )}
          </Paper>
          <Paper elevation={2} className="h-11 rounded-md w-full md:w-[48%]">
            {isEditing ? (
              <input
                type="text"
                defaultValue={userData.email}
                className="w-full h-full text-center outline-none opacity-60"
                readOnly
              />
            ) : (
              <input
                type="text"
                defaultValue={userData.email}
                className="w-full h-full text-center outline-none"
                readOnly
              />
            )}
          </Paper>
          <Paper elevation={2} className="h-11 rounded-md w-full md:w-[48%]">
            {isEditing ? (
              <input
                type="text"
                defaultValue={userData.role}
                className="w-full h-full text-center outline-none opacity-60"
                readOnly
              />
            ) : (
              <input
                type="text"
                defaultValue={userData.role}
                className="w-full h-full text-center outline-none"
                readOnly
              />
            )}
          </Paper>
          {isEditing ? (
            <div className="w-full md:w-[26%] flex justify-between">
              <button
                className="bg-black text-white px-3 py-1 rounded-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-[#007bff] text-white px-3 py-1 rounded-sm"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
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
