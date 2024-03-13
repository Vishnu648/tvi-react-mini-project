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
import SearchBar from "./SearchBar";

export default function DataTable({ newUserData, searchDataFunction }) {
  const [userData, setuserData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");
  let local_refreshToken = localStorage.getItem("refreshToken");

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
        <button>
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

  const userApiCall = (pn = 1) => {
    axios
      .get(`http://localhost:8000/api/users?page=${pn}`, {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        setuserData(response.data.users);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    userApiCall();
  }, []);

  const selectedPage = (pageNo) => {
    setCurrentPageNo(pageNo);
    userApiCall(pageNo);
  };

  return (
    <div>
      <div
        style={{ borderRadius: "4px" }}
        className="w-full md:h-[60vh] md:overflow-scroll mb-6"
      >
        <div className="bg-[#e9ecef] md:h-[50px] h-[60px] md:py-0 rounded-t-[4px] flex flex-col justify-between items-center md:hidden px-4 text-[#212529]">
          User Data
          <SearchBar searchDataFunction={searchDataFunction} />
        </div>
        <div className="border flex-1">
          <DataGrid
            rows={newUserData.length > 0 ? newUserData : userData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
        <ToastContainer />
      </div>
      <Pagination
        pages={Math.ceil(totalCount / 10)}
        selectedPage={selectedPage}
      />
    </div>
  );
}
