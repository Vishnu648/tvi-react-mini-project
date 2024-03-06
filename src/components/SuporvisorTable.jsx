import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleUserModal from "./modals/SingleUserModal";

export default function DataTable() {
  const [userData, setuserData] = useState([]);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");

  const columns = [
    // { field: "id", headerName: "id", width: 200 },
    // { field: "", headerName: "", width: 10 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
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

  const userApiCall = () => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          genericvalue: "supervisor",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        setuserData(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    userApiCall();
  }, []);

  return (
    <div style={{ height: 400, borderRadius: "4px" }}>
      <div className="bg-[#e9ecef] h-[50px] rounded-t-[4px] flex items-center px-4 text-[#212529]">
        User Data
      </div>
      <div className="border flex-1">
        <DataGrid
          rows={userData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}