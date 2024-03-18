import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUpload from "../ImageUpload";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imageSetter = (path) => {
    console.log(path);
  };

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
            <ImageUpload imageSetter={imageSetter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                Product Name
                <br />
                <input
                  //   onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  //   defaultValue={obj.firstName}
                  placeholder="product name"
                />
              </label>
              <label id="Label">
                Product Price
                <br />{" "}
                <input
                  //   onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  //   defaultValue={obj.lastName}
                  // value={lastName}
                  placeholder="product price"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
              <label id="Label">
                Category
                <br />
                <input
                  type="text"
                  //   defaultValue={obj.email}
                  // value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  placeholder="Category"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                Availability
                <br />
                <input
                  //   onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  //   defaultValue={obj.firstName}
                  placeholder="yes/no"
                />
              </label>
              <label id="Label">
                Quantity
                <br />{" "}
                <input
                  //   onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  //   defaultValue={obj.lastName}
                  // value={lastName}
                  placeholder="00"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <label id="Label">
                Product Details
                <br />
                <textarea
                  // type="text"
                  //   defaultValue={obj.email}
                  // value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  placeholder="this product is used for ..."
                  className="p-2"
                />
              </label>
            </div>

            <button className="bg-[#007bff] hover:bg-[#0062cc] my-4 py-[6px] px-4 rounded-[3px] text-white">
              Add
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
