import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import AdminTable from "../components/AdminTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { PiUserPlus } from "react-icons/pi";
import AdminSidebar from "../components/AdminSidebar";
import {
  set_Access_Tokken,
  set_Refresh_Token,
} from "../Redux/features/tokenSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const tokens = useSelector((state) => state.token.access_token);
  const local_refreshToken = localStorage.getItem("refreshToken");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  let local_accessToken = localStorage.getItem("accessToken");
  let local_role = localStorage.getItem("role");
  const [newUserData, setnewUserData] = useState({});

  useEffect(() => {
    if (local_role != "admin") {
      navigate(-1);
    }
  }, []);

  const toogleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  const searchDataFunction = (obj) => {
    setnewUserData(obj);
    console.log("from home--", obj);
  };

  return (
    <div className="w-screen">
      <Navbar
        toogleSidebar={toogleSidebar}
        searchDataFunction={searchDataFunction}
      />
      <section className="flex w-full">
        <div
          className={`transition-all duration-500 ${
            sidebarIsOpen ? "w-[225px]" : "w-0"
          } overflow-hidden`}
        >
          <AdminSidebar />
        </div>
        <section className="px-6 flex-1 overflow-scroll">
          <p className="text-[35px] mb-[.5rem] mt-[1.5rem] text-[#212529] leading-[1.2]">
            Dashboard
          </p>
          <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
            Dashboard
          </div>
          <AdminTable
            newUserData={newUserData}
            searchDataFunction={searchDataFunction}
          />
        </section>
      </section>
    </div>
  );
}

export default Home;
