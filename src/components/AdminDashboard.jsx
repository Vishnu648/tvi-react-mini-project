import React from "react";
import AreaChartt from "../components/charts/AreaChart";
import BarChartt from "../components/charts/BarChart";
import AdminTable from "../components/AdminTable";

function AdminDashboard({ newUserData, searchDataFunction }) {
  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh]">
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
      <AdminTable
        newUserData={newUserData}
        searchDataFunction={searchDataFunction}
      />
    </section>
  );
}

export default AdminDashboard;
