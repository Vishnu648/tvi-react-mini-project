import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  bgcolor: "background.paper",
  border: "2px solid #212529",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ id, userApiCall }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/delete/${id}`, {
        headers: {
          genericvalue: "admin",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          userApiCall();
          handleClose();
        }
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div>
      <MdDelete onClick={handleOpen} size={"20px"} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure, you want to delete this user?
          </Typography>
          <div className="flex justify-between">
            <button
              onClick={handleClose}
              className="bg-[#6b6b6b] hover:bg-[#616161] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-[#fd6969] hover:bg-[#c33a37] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
