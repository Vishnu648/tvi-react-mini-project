import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUpload from "../../ImageUpload";
import { MdEdit } from "react-icons/md";
import axios from "axios";

const style = {
  position: "absolute",
  top: "52%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '60vw',
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ obj }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [proImg, setProImg] = useState("");
  const [proName, setProName] = useState(obj?.productName);
  const [proPrice, setProPrice] = useState(obj?.productPrice);
  const [proCategory, setProCategory] = useState(obj?.category);
  const [proAvailability, setProAvailability] = useState(obj?.availability);
  const [proQuanity, setProQuanity] = useState(obj?.quantity);
  const [proDetails, setProDetails] = useState(obj?.productDetails);
  const [proCode, setProCode] = useState(obj?.productCode);
  let local_accessToken = localStorage.getItem("accessToken");

  const imageSetter = (path) => {
    console.log(path);
  };

  const handleSubmit = (e) => {
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
      .put(`http://localhost:8000/api/updateProdt/${obj._id}`, details, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        res.status == "200" ? handleClose() : console.log('res-',res);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <MdEdit onClick={handleOpen} className="text-2xl cursor-pointer" />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg overflow-scroll">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Product
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
              onClick={handleSubmit}
              className="bg-[#007bff] hover:bg-[#0062cc] my-4 py-[6px] px-4 rounded-[3px] text-white"
            >
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
