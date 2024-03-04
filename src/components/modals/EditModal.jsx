import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #212529",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ obj, userApiCall }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = useState(obj.firstName);
  const [lastName, setLastName] = useState(obj.lastName);
  const [email, setEmail] = useState(obj.email);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [role, setRole] = useState(obj.role);
  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");

  const handleEdit = (e) => {
    e.preventDefault();

    const newDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: obj.password,
      role: role,
    };

    axios
      .put(`http://localhost:8000/api/update/${obj.id}`, newDetails, {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          userApiCall();
          handleClose();
        }
      });
  };

  return (
    <div>
      <MdEdit onClick={handleOpen} size={"20px"} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Details
          </Typography>
          <form className=" p-5 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                First Name
                <br />{" "}
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  defaultValue={obj.firstName}
                  value={firstName}
                  placeholder="Enter first name"
                />
              </label>
              <label id="Label">
                Last Name
                <br />{" "}
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  defaultValue={obj.lastName}
                  value={lastName}
                  placeholder="Enter last name"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
              <label id="Label">
                Email
                <br />{" "}
                <input
                  type="email"
                  defaultValue={obj.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </label>

              <label htmlFor="role" className="flex gap-2">
                Role:
                <select
                  name="role"
                  id="role"
                  onClick={(e) => setRole(e.target.value)}
                  value={role}
                  defaultValue={obj.role}
                  className="px-2 rounded-md"
                >
                  <option value="qa">QA</option>
                  <option value="qc">Qc</option>
                  <option value="agent">Agent</option>
                  <option value="supervisor">supervisor</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                Password
                <br />{" "}
                <input
                  type="text"
                  defaultValue={obj.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </label>
            </div>

            <button
              onClick={handleEdit}
              className="bg-[#007bff] hover:bg-[#0062cc] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Update
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
