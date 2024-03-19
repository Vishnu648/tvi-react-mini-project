import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUpload from "../ImageUpload";
import axios from "axios";
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
import userDP from "../../assets/userDP.png";

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [proImg, setProImg] = useState("");
  const [proName, setProName] = useState("");
  const [proPrice, setProPrice] = useState("");
  const [proCategory, setProCategory] = useState("");
  const [proAvailability, setProAvailability] = useState("");
  const [proQuanity, setProQuanity] = useState("");
  const [proDetails, setProDetails] = useState("");
  const [proCode, setProCode] = useState("");
  let local_accessToken = localStorage.getItem("accessToken");

  const imageSetter = (path) => {
    console.log(path);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const details = {
      availability: proAvailability,
      category: proCategory,
      productDetails: proDetails,
      productName: proName,
      productPrice: proPrice,
      quantity: proQuanity,
      productCode: proCode,
    //   image: userDP,

    };
    axios
      .post("http://localhost:8000/api/addProdt", details, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });

    console.log("-- ~ handleAddProduct ~ details:", details);
    // handleClose()
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
            <div className=" flex gap-2 items-center ">
              <div className="h-20 w-20 border rounded-full flex items-center justify-center">
                img
              </div>
              <ImageUpload imageSetter={imageSetter} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                Product Name
                <br />
                <input
                  onChange={(e) => setProName(e.target.value)}
                  type="text"
                  value={proName}
                  placeholder="product name"
                />
              </label>
              <label id="Label">
                Product Price
                <br />{" "}
                <input
                  onChange={(e) => setProPrice(e.target.value)}
                  type="text"
                  value={proPrice}
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
                  value={proCategory}
                  onChange={(e) => setProCategory(e.target.value)}
                  placeholder="Category"
                />
              </label>
              <label id="Label">
                Product Code
                <br />
                <input
                  type="text"
                  value={proCode}
                  onChange={(e) => setProCode(e.target.value)}
                  placeholder="product code"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label id="Label">
                Availability
                <br />
                <input
                  onChange={(e) => setProAvailability(e.target.value)}
                  value={proAvailability}
                  type="text"
                  placeholder="yes/no"
                />
              </label>
              <label id="Label">
                Quantity
                <br />
                <input
                  onChange={(e) => setProQuanity(e.target.value)}
                  type="text"
                  value={proQuanity}
                  placeholder="00"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <label id="Label">
                Product Details
                <br />
                <textarea
                  onChange={(e) => setProDetails(e.target.value)}
                  value={proDetails}
                  placeholder="this product is used for ..."
                  className="p-2 border rounded-sm"
                />
              </label>
            </div>

            <button
              onClick={handleAddProduct}
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
