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

function Home() {
  const tokens = useSelector((state) => state.token.access_token);
  const local_refreshToken = localStorage.getItem("refreshToken");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);


  // useEffect(() => {
  //   setInterval(() => {
  //     axios
  //       .post("http://localhost:8000/api/refresh-token", {
  //         refreshToken: tokens.refreshToken || local_refreshToken,
  //       })
  //       .then((res) => dispatch(set_Access_Tokken(res.data.refresh_token)))
  //       .catch((err) => err.message);
  //   }, 3600000);
  // }, []);

  const toogleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  return (
    <div className="w-screen">
      <Navbar toogleSidebar={toogleSidebar} />
      <section className="flex w-full">
        <div
          className={`transition-all duration-500 ${
            sidebarIsOpen ? "w-[225px]" : "w-0"
          } overflow-hidden`}
        >
          <AdminSidebar />
        </div>
        {/* {sidebarIsOpen ? <AdminSidebar /> : ""} */}
        <section className="px-6 flex-1 overflow-scroll">
          <p className="text-[35px] mb-[.5rem] mt-[1.5rem] text-[#212529] leading-[1.2]">
            Dashboard
          </p>
          <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
            Dashboard
          </div>
          <AdminTable />
        </section>
      </section>
    </div>
  );
}

export default Home;
