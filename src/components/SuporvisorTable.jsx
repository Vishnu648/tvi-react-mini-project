import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleUserModal from "./modals/SingleUserModal";
import Pagination from "../components/Pagination";

export default function DataTable() {
  const [userData, setuserData] = useState([]);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");
  const [pageCount, setPageCount] = useState(1);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const columns = [
    // { field: "id", headerName: "id", width: 200 },
    { field: "", headerName: "", width: 10 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "role",
      headerName: "Role",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 320,
    },
    {
      field: "view",
      headerName: "View",
      width: 120,
      renderCell: (e) => (
        <button>
          <SingleUserModal obj={e.row} />
        </button>
      ),
    },
  ];

  const userApiCall = (pn = 1) => {
    axios
      .get(`http://localhost:8000/api/users?page=${pn}`, {
        headers: {
          genericvalue: "supervisor",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        setuserData(response.data.users);
        setPageCount(response.data.totalCount);
        // console.log(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    userApiCall();
  }, []);

  const selectedPage = (pageNo) => {
    // console.log(pageNo);
    setCurrentPageNo(pageNo);
    userApiCall(pageNo);
  };

  return (
    <div>
      <div
        style={{ borderRadius: "4px" }}
        className="w-full md:h-[60vh] md:overflow-scroll mb-6"
      >
        <div className="bg-[#e9ecef] h-[50px] rounded-t-[4px] flex items-center px-4 text-[#212529]">
          User Data
        </div>
        <div className="border flex-1">
          <DataGrid
            rows={userData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
      <Pagination pages={2} selectedPage={selectedPage} />
    </div>
  );
}
