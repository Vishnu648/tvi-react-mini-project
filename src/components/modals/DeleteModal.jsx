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
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #212529",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ message='Are you Sure...?',id, userApiCall,showToastMessage,handleDelete,size }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");


  return (
    <div>
      <MdDelete className="cursor-pointer text-2xl" onClick={handleOpen} size={size} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          <div className="flex justify-between">
            <button
              onClick={handleClose}
              className="bg-[#6b6b6b] hover:bg-[#616161] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Cancel
            </button>
            <button
              onClick={()=>handleDelete(id)}
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
