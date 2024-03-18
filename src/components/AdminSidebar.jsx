import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiUserPlus } from "react-icons/pi";
import { IoAddCircle } from "react-icons/io5";

function AdminSidebar({ selectedOption }) {
  return (
    <nav className="bg-[#212529] relative w-[225px] h-[92vh] transition ease-in-out duration-500">
      <div className="w-full h-[58px] px-4 pt-7 pb-3 text-[#585b5e] font-medium text-[13px]">
        CORE
      </div>
      <div
        onClick={() => selectedOption("dashboard")}
        className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal "
      >
        <AiOutlineDashboard />
        <p className="hover:text-white">Dashboard</p>
      </div>

      <Link
        to="/register"
        className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal "
      >
        <PiUserPlus />
        <p onClick={()=>selectedOption('create_user')} className="hover:text-white">Create User</p>
      </Link>

      <div
        className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal "
      >
        <IoAddCircle />
        <p onClick={()=>selectedOption('products')} className="hover:text-white">Products</p>
      </div>

      <div className="text-[#818588] bg-[#343a40] absolute bottom-0 flex flex-col w-full h-[67.2px] p-3">
        <p className="font-medium">Logged in as:</p>
        <h2>Admin</h2>
      </div>
    </nav>
  );
}

export default AdminSidebar;
