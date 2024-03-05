import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import SupervisorTable from "../components/SuporvisorTable";

function SupervisorDashboard() {
  return (
    <div>
      <Navbar />
      <section className="flex">
        <nav className="bg-[#212529] relative w-[225px] h-[92vh]">
          <div className="w-full h-[58px] px-4 pt-7 pb-3 text-[#585b5e] font-medium text-[13px]">
            CORE
          </div>
          <div className="w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] cursor-pointer text-[1rem] font-normal ">
            <AiOutlineDashboard />
            <p className="hover:text-white">Dashboard</p>
          </div>

          <div className="text-[#818588] bg-[#343a40] absolute bottom-0 flex flex-col w-full h-[67.2px] p-3">
            <p className="font-medium">Logged in as:</p>
            <h2>Supervisor</h2>
          </div>
        </nav>
        <section className="px-6 flex-1">
          <p className="text-[35px] mb-[.5rem] mt-[1.5rem] text-[#212529] leading-[1.2]">
            Dashboard
          </p>
          <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-6">
            Dashboard
          </div>
          <SupervisorTable/>
        </section>
      </section>
    </div>
  );
}

export default SupervisorDashboard;
