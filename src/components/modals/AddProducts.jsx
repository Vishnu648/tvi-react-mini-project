import React, { useState, useEffect } from "react";
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
  width: 545,
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import productImg from "../../assets/productImg.jpg";
import userDP from "../../assets/userDP.png";

export default function BasicModal({ productApiCall }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [proImg, setProImg] = useState("");
  const [proName, setProName] = useState("Asus Tuf A15");
  const [proPrice, setProPrice] = useState("80000");
  const [proCategory, setProCategory] = useState("laptop");
  const [proAvailability, setProAvailability] = useState("yes");
  const [proStock, setProStock] = useState("3");
  const [proOffer, setProOffer] = useState(0);
  const [proColor, setProColor] = useState("red");
  const [proDetails, setProDetails] = useState(
    "Featuring a speedy IPS-level panel up to 144Hz, the TUF Gaming A15 is perfect for fast-paced gaming. With adaptive sync, the display's refresh rate synchronizes with the GPU's frame rate to reduce lag, minimize stuttering, and eliminate visual tearing for ultra-smooth and immersive gameplay."
  );
  let local_accessToken = localStorage.getItem("accessToken");
  const [imagePath, setImagePath] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [imgPathUrl, setImgPathUrl] = useState("");

  const imageSetter = (path, url) => {
    console.log(path);
    setSelectedImg(path);
    setImgPathUrl(url);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", proName);
    formData.append("price", proPrice);
    formData.append("description", proDetails);
    formData.append("category", proCategory);
    formData.append("availability", proAvailability);
    formData.append("stock", proStock);
    formData.append("offer", proOffer);
    formData.append("color", proColor);
    formData.append("image", selectedImg);

    axios
      .post("http://localhost:8000/api/addProdt", formData, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((response) => {
        productApiCall();
        console.log(response);
        setProName("");
        setProPrice("");
        setProCategory("");
        setProAvailability("");
        setProStock("");
        setProOffer("");
        setProColor("");
        setProDetails("");
      })
      .catch((err) => {
        console.log(err.message);
      });

    handleClose();
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
        <Box sx={style} className="rounded-lg overflow-scroll">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Product
          </Typography>
          <form className=" p-5 flex flex-col gap-5">
            <div className=" flex gap-2 items-center ">
              {/* <div className="h-20 w-20 border rounded-full flex items-center justify-center">
                img
              </div> */}
              <div className="h-28 w-28 p-2 flex items-center justify-center">
                {selectedImg ? (
                  <img
                    src={imgPathUrl ? imgPathUrl : productImg}
                    alt="pdts"
                    className="h-full w-full object-contain rounded-lg"
                  />
                ) : (
                  <img
                    src={
                      imagePath
                        ? `data:image/png;base64,${imagePath}`
                        : productImg
                    }
                    alt="pdt"
                    className="h-full w-full object-contain rounded-lg"
                  />
                )}
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
                Product Color
                <br />
                <input
                  type="text"
                  value={proColor}
                  onChange={(e) => setProColor(e.target.value)}
                  placeholder="red"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
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
                Stock
                <br />
                <input
                  onChange={(e) => setProStock(e.target.value)}
                  type="text"
                  value={proStock}
                  placeholder="00"
                />
              </label>
              <label id="Label">
                Product Offer
                <br />
                <input
                  type="text"
                  value={proOffer}
                  onChange={(e) => setProOffer(e.target.value)}
                  placeholder="discount in %..."
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
