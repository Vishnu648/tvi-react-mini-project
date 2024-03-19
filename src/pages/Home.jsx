import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
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

import AdminDashboard from "../components/AdminDashboard";
import AddProducts from "./Products";
import SingleProduct from "./SingleProduct";

function Home() {
  const navigate = useNavigate();
  const tokens = useSelector((state) => state.token.access_token);
  const local_refreshToken = localStorage.getItem("refreshToken");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  let local_accessToken = localStorage.getItem("accessToken");
  let local_role = localStorage.getItem("role");
  const [newUserData, setnewUserData] = useState({});
  const [sidebarOption, setSidebarOption] = useState("products");
  const [selectedProductId, setSelectedProductId] = useState("");

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
    // console.log("from home--", obj);
  };

  const selectedOption = (opt, id) => {
    setSidebarOption(opt);
    setSelectedProductId(id);
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
          <AdminSidebar selectedOption={selectedOption} />
        </div>
        {sidebarOption == "dashboard" ? (
          <AdminDashboard
            newUserData={newUserData}
            searchDataFunction={searchDataFunction}
          />
        ) : sidebarOption == "create_user" ? (
          {
            /* console.log("create_user") */
          }
        ) : sidebarOption == "product" ? (
          <SingleProduct
            id={selectedProductId}
            selectedOption={selectedOption}
          />
        ) : sidebarOption == "products" ? (
          <AddProducts selectedOption={selectedOption} />
        ) : (
          console.log("not defined")
        )}
      </section>
    </div>
  );
}

export default Home;
