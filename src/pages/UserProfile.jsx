import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import userDP from "../assets/userDP.png";
import ImageUpload from "../components/ImageUpload";
import { set_Access_Tokken } from "../Redux/features/tokenSlice";
import showToastMessage from "../components/ToastMessager";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
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
  let local_role = localStorage.getItem("role");

  const imageSetter = (path) => {
    const encoder = new TextEncoder();
    const inputString = path;
    const buffer = encoder.encode(inputString);
    // console.log('buffered img',buffer);
    setImagePath(buffer);
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
        setuserData(response.data.result);
        // console.log(response.data.result);

        const base64String = btoa(
          String.fromCharCode(
            ...new Uint8Array(response.data.result?.image?.data)
          )
        );
        setImagePath(base64String);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const toogleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (local_role != "agent") {
      navigate(-1);
    }
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
      image: imagePath,
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
          if (response.status == 200) {
            showToastMessage("details updated successfully!!!");
          }
        }
      })
      .catch((error) => {
        console.error("**", error.message);
      });
    userApiCall();

    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setImagePath(userData.imageURL);
    setIsEditing((prev) => !prev);
  };

  let words = fullName.split(" ");

  let dp = words
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <UserNavbar toogleSidebar={toogleSidebar} />
      <div className="flex ">
        <div
          className={`transition-all duration-500 ${
            sidebarIsOpen ? "w-[225px]" : "w-0"
          } overflow-hidden`}
        >
          <UserSidebar fullName={fullName} />
        </div>
        <div className="flex flex-col border p-6 gap-3 items-center flex-1">
          <div className="ml-3 h-[160px] w-[160px] border rounded-full bg-slate-600 object-contain flex items-center justify-center">
            {imagePath ? (
              <img
                src={`data:image/png;base64,${imagePath}`}
                className="rounded-full object-fill h-full w-full"
              />
            ) : (
              <p className="text-white text-[4rem]">{dp || "UN"}</p>
            )}
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
                defaultValue={userData._id}
                className="w-full h-full text-center outline-none opacity-60"
                readOnly
              />
            ) : (
              <input
                type="text"
                defaultValue={userData._id}
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
