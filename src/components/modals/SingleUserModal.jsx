import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GrView } from "react-icons/gr";
import { Paper } from "@mui/material";
import userDP from "../../assets/userDP.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
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
          <div className="flex justify-around items-center">
            <div className="border w-16 h-16 rounded-full object-contain flex items-center justify-center">
              <img
                src={obj.imageURL ? obj.imageURL : userDP}
                alt="dp"
                className="rounded-full h-full w-full"
              />
            </div>
            <h1 className="text-3xl">
              {`${obj?.firstName || obj?.role} ${
                obj.lastName ? obj.lastName : ""
              }`}
            </h1>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {obj?.firstName ? (
              <Paper className="px-6 py-4 w-full flex gap-4">
                <label>First Name:</label>
                <p>{obj?.firstName}</p>
              </Paper>
            ) : (
              ""
            )}
            {obj?.lastName ? (
              <Paper className="px-6 py-4 w-full flex gap-4">
                <label>Last Name:</label>
                <p>{obj?.lastName}</p>
              </Paper>
            ) : (
              ""
            )}
            <Paper className="px-6 py-4 w-full flex gap-4">
              <label>Role:</label>
              <p>{obj?.role}</p>
            </Paper>
            <Paper className="px-6 py-4 w-full flex gap-4">
              <label>Email:</label>
              <p>{obj?.email}</p>
            </Paper>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
