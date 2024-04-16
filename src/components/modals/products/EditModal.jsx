import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUpload from "../../ImageUpload";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import productImg from "../../../assets/productImg.jpg";

const style = {
  position: "absolute",
  top: "52%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ obj, imgPath, productApiCall }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imagePath, setImagePath] = useState(imgPath);
  const [proName, setProName] = useState(obj.title);
  const [proPrice, setProPrice] = useState(obj.price);
  const [proCategory, setProCategory] = useState(obj.category);
  const [proAvailability, setProAvailability] = useState(obj.availability);
  const [proStock, setProStock] = useState(obj.stock);
  const [proOffer, setProOffer] = useState(obj.offer);
  const [proColor, setProColor] = useState(obj.color);
  const [proDetails, setProDetails] = useState(obj.description);

  let local_accessToken = localStorage.getItem("accessToken");
  const [selectedImg, setSelectedImg] = useState("");

  const imageSetter = (path) => {
    const details = {
      image: path,
    };
    setSelectedImg(path);
    // console.log(path);
    axios
      .post("http://localhost:8000/image/import", details, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    // if (obj?.image.length > 0) {
    //   const base64String = btoa(
    //     String.fromCharCode(...new Uint8Array(obj?.image?.data))
    //   );
    // } else {
    //   setImagePath(productImg);
    // }
  }, []);

  const handleSubmit = (e) => {
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
    formData.append("image", imagePath);
    axios
      .put(`http://localhost:8000/api/updateProdt/${obj._id}`, formData, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        if (res.status == "200") {
          handleClose();
          productApiCall();
        } else {
          console.log("res--", res);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log("ead;f", obj.image);
  }, []);

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
