import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function DataTable() {
  const [userData, setuserData] = useState([]);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");

  const columns = [
    { field: "id", headerName: "id", width: 150 },
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
      field: "email",
      headerName: "Email",
      width: 240,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (e) => (
        <button onClick={() => handleEdit(e.row)}>
          <MdEdit size={"20px"} />
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (e) => (
        <button onClick={() => handleDelete(e.row.id)}>
          <MdDelete size={"20px"} />
        </button>
      ),
    },
  ];

  const handleEdit = (obj) => {
    // axios
    //   .put(`http://localhost:8000/api/delete/${obj.id}`, {
    //     headers: {
    //       genericvalue: "admin",
    //       Authorization: tokens.access_token || local_accessToken,
    //     },
    //   })
    //   .then((response) => console.log(response));
    console.log(obj);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete/${id}`, {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        userApiCall();
      });
  };

  const userApiCall = () => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => setuserData(response.data.data));
  };

  useEffect(() => {
    userApiCall();
  }, []);

  return (
    <div style={{ height: 400, borderRadius: "4px" }}>
      <div className="bg-[#e9ecef] h-[50px] rounded-t-[4px] flex items-center px-4 text-[#212529]">
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
      />
    </div>
  );
}