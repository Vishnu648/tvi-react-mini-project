import React from "react";
import Navbar from "../components/Navbar";
import { AiTwotoneDashboard } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import AdminTable from "../components/AdminTable";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <section className="flex">
        <nav className="bg-[#212529] w-[225px] h-screen">
          <div className="w-full h-[58px] px-4 pt-7 pb-3 text-[#585b5e] font-medium text-[13px]">
            CORE
          </div>
          <div className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal ">
            <AiTwotoneDashboard />
            <p className="hover:text-white">Dashboard</p>
          </div>

          <Link
            to="/"
            className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal "
          >
            <MdOutlineCreateNewFolder />
            <p className="hover:text-white">Create User</p>
          </Link>
        </nav>
        <section className="px-6 flex-1">
          <p className="text-[35px] mb-[.5rem] mt-[1.5rem] text-[#212529] leading-[1.2]">
            Dashboard
          </p>
          <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-6">
            Dashboard
          </div>
          <AdminTable />
        </section>
      </section>
    </div>
  );
}

export default Home;
