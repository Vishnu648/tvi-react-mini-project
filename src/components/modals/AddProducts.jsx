import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className="bg-[#6b6b6b] hover:bg-[#616161] my-4 py-[6px] px-3 rounded-[3px] text-white"
        onClick={handleOpen}
      >
        Add Products
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Product
          </Typography>
          <form className=" p-5 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                First Name
                <br />{" "}
                <input
                //   onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                //   defaultValue={obj.firstName}
                  placeholder="Enter first name"
                />
              </label>
              <label id="Label">
                Last Name
                <br />{" "}
                <input
                //   onChange={(e) => setLastName(e.target.value)}
                  type="text"
                //   defaultValue={obj.lastName}
                  // value={lastName}
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
                //   defaultValue={obj.email}
                  // value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </label>


            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                Password
                <br />{" "}
                <input
                  type="text"
                //   defaultValue={obj.password}
                //   onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </label>
            </div>

            <button
             
              className="bg-[#007bff] hover:bg-[#0062cc] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Add
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
