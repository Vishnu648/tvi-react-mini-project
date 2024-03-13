import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../pages/style.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function BasicModal({ showToastMessage }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let local_accessToken = localStorage.getItem("accessToken");
  const [passwordValid, setPasswordValid] = useState(true);

  const handleChange = () => {
    const passes = {
      currentPassword: currentPassword,
      password: newPassword,
    };

    axios
      .put("http://localhost:8000/api/me/update-password", passes, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          setNewPassword("");
          setCurrentPassword("");
          showToastMessage("Password updated successfully");
          handleClose();
        }
      })
      .catch((err) => {
        if (err.response.status == 400) {
          showToastMessage("Current password is incorrect");
        }
      });
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setNewPassword(inputPassword);
    if (inputPassword.length < 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };
  return (
    <div className="outline-none">
      <p onClick={handleOpen} className="hover:text-white">
        Update password
      </p>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="mb-8">Change Password</h2>
          <div className="flex flex-col gap-5">
            <label id="Label">
              Current Password
              <br />{" "}
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="00000000"
              />
            </label>
            <label id="Label">
              New Password
              <br />{" "}
              <input
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="********"
              />
              {passwordValid ? null : (
                <p style={{ color: "red" }}>
                  Password must be at least 8 characters
                </p>
              )}
            </label>

            <button
              onClick={handleChange}
              className="bg-[#007bff] hover:bg-[#0062cc] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Change
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
