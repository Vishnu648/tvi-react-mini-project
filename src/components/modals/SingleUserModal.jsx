import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { GrView } from "react-icons/gr";
import { Paper } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ obj }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen}>
        <GrView />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg">
          <h1 className="text-3xl mb-5">
            {`${obj?.firstName || obj?.role} ${
              obj.lastName ? obj.lastName : ""
            }`}
          </h1>
          <div className="p-4 flex flex-col gap-3">
            <Paper className="px-2 py-4 w-full flex gap-4">
              <label>First Name:</label>
              <p>{obj?.firstName}</p>
            </Paper>
            <Paper className="px-2 py-4 w-full flex gap-4">
              <label>Last Name:</label>
              <p>{obj?.lastName}</p>
            </Paper>
            <Paper className="px-2 py-4 w-full flex gap-4">
              <label>Role:</label>
              <p>{obj?.role}</p>
            </Paper>
            <Paper className="px-2 py-4 w-full flex gap-4">
              <label>Email:</label>
              <p>{obj?.email}</p>
            </Paper>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
