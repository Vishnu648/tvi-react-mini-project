import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

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

export default function BasicModal({
  handleFunction,
  selectedPage,
  addressId,
  productId
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let local_accessToken = localStorage.getItem("accessToken");

  const singleProductOrder = () => {
    const address = {
      addressId: addressId,
    };

    axios
      .post(`http://localhost:8000/api/orderSingle/${productId}`, address, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message));
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-[#fb641b] text-white px-7 py-1 rounded-sm font-[500]"
      >
        Continue{" "}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure , you want to place this order ?
          </Typography>
          <div className="flex justify-between">
            <button
              onClick={handleClose}
              className="bg-[#6b6b6b] hover:bg-[#616161] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedPage === "fromCart") {
                  handleFunction();
                  handleClose();
                } else {
                  console.log("ordered");
                  singleProductOrder();
                  handleClose();
                }
              }}
              className="bg-[#fb641b] hover:bg-[#fb644b] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Place Order
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
