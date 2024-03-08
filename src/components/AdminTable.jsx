import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import SingleUserModal from "./modals/SingleUserModal";
import { ToastContainer, toast } from "react-toastify";
import showToastMessage from "./ToastMessager";
import Pagination from "../components/Pagination";

export default function DataTable() {
  const [userData, setuserData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");

  const columns = [
    // { field: "id", headerName: "id", width: 200 },
    { field: "", headerName: "", width: 10 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "role",
      headerName: "Role",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 310,
    },
    {
      field: "view",
      headerName: "View",
      width: 135,
      renderCell: (e) => (
        <button>
          <SingleUserModal obj={e.row} />
        </button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 135,
      renderCell: (e) => (
        <button onClick={() => console.log(e.row)}>
          <EditModal obj={e.row} userApiCall={userApiCall} />
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 135,
      renderCell: (e) => (
        <button>
          <DeleteModal
            showToastMessage={showToastMessage}
            id={e.row.id}
            userApiCall={userApiCall}
          />
        </button>
      ),
    },
  ];

  const userApiCall = () => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        setuserData(response.data.users);
        setPageCount(response.data.totalCount);
        console.log(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    userApiCall();
  }, []);

  return (
    <div style={{ height: 400, borderRadius: "4px" }} className="w-full">
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
      <ToastContainer />
      <Pagination pageCount={pageCount} />
    </div>
  );
}
