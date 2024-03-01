import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function DataTable() {
  const [userData, setuserData] = useState([]);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          // method: "POST",
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => setuserData(response.data.data));
      
  }, []);

  return (
    <div style={{ height: 400, width: "100%", borderRadius: "4px" }}>
      <div className="bg-[#e9ecef] w-full h-[50px] rounded-t-[4px] flex items-center px-4 text-[#212529]">
        User Data
      </div>
      <DataGrid
        rows={userData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
