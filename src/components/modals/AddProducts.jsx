import React, { useState,useEffect } from "react";
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
import productImg from '../../assets/productImg.jpg'
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
  const [proDetails, setProDetails] = useState(
    "Featuring a speedy IPS-level panel up to 144Hz, the TUF Gaming A15 is perfect for fast-paced gaming. With adaptive sync, the display's refresh rate synchronizes with the GPU's frame rate to reduce lag, minimize stuttering, and eliminate visual tearing for ultra-smooth and immersive gameplay."
  );
  const [proCode, setProCode] = useState("121212");
  let local_accessToken = localStorage.getItem("accessToken");
  const [imagePath, setImagePath] = useState("");
  const [selectedImg, setSelectedImg] = useState("");


  const imageSetter = (path) => {
    // console.log(path);
    setSelectedImg(path);
  };



  const handleAddProduct = (e) => {
    e.preventDefault();
    // const details = {
    //   availability: proAvailability,
    //   category: proCategory,
    //   productDetails: proDetails,
    //   productName: proName,
    //   productPrice: proPrice,
    //   stock: proStock,
    //   productCode: proCode,
    //   //   image: userDP,
    // };

  
  

    const formData = new FormData();
    formData.append("availability", proAvailability);
    formData.append("category", proCategory);
    formData.append("productDetails", proDetails);
    formData.append("productName", proName);
    formData.append("productPrice", proPrice);
    formData.append("stock", proStock);
    formData.append("productCode", proCode);
    formData.append("imageURL", selectedImg);

    console.log(formData)
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
                    src={selectedImg ? `${selectedImg}` : productImg}
                    alt="pdt"
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
                Stock
                <br />
                <input
                  onChange={(e) => setProStock(e.target.value)}
                  type="text"
                  value={proStock}
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
