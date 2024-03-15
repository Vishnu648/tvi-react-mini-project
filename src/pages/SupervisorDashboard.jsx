import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineDashboard } from "react-icons/ai";
import SupervisorTable from "../components/SuporvisorTable";
import { useNavigate } from "react-router-dom";
import AreaChartt from "../components/charts/AreaChart";
import BarChartt from "../components/charts/BarChart";

function SupervisorDashboard() {
  const navigate = useNavigate();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  let local_role = localStorage.getItem("role");

  const toogleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (local_role != "supervisor") {
      navigate(-1);
    }
  }, []);

  return (
    <div>
      <Navbar toogleSidebar={toogleSidebar} />
      <section className="flex">
        <div
          className={`transition-all duration-500 ${
            sidebarIsOpen ? "w-[225px]" : "w-0"
          } overflow-hidden`}
        >
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
        </div>
        <section className="px-6 flex-1 h-[600px] overflow-scroll">
          <p className="text-[35px] mb-[.5rem] mt-[1.5rem] text-[#212529] leading-[1.2]">
            Dashboard
          </p>
          <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
            Dashboard
          </div>
          <div className="flex flex-col lg:flex-row gap-3 justify-between items-center p-5 my-8 overflow-scroll border rounded-md">
            <AreaChartt />
            <BarChartt />
          </div>
          <SupervisorTable />
        </section>
      </section>
    </div>
  );
}

export default SupervisorDashboard;
