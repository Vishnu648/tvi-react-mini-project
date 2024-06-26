import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #212529",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ id, userApiCall }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    handleClose();
    navigate("/login");
  };
  return (
    <div>
      {/* <MdDelete onClick={handleOpen} size={"20px"} /> */}
      <p className="px-2 py-1 cursor-pointer flex items-center gap-1" onClick={handleOpen}>
      <FiLogOut/>
        Logout
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure, you want to logout?
          </Typography>
          <div className="flex justify-between">
            <button
              onClick={handleClose}
              className="bg-[#6b6b6b] hover:bg-[#616161] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              no
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#fd6969] hover:bg-[#c33a37] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              yes
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
