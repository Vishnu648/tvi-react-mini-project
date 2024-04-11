import React, { useState, useEffect } from "react";
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

export default function BasicModal({ productId }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setRating("");
    // setComment("");
    setOpen(false);
  };
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("comment");

  const handleRate = (e) => {
    e.preventDefault();
    const details = {
      rating: rating,
      comment: comment,
    };

    axios
      .post(`http://localhost:8000/api/add_review/${productId}`, details, {
        headers: {
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="border px-3 py-1 hover:shadow-md hover:shadow-black"
      >
        Rate Product
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rate this product...
          </Typography>
          <form onSubmit={handleRate} className="flex flex-col gap-2 mt-5">
            <input
              onChange={(e) => setRating(e.target.value)}
              defaultValue={rating}
              placeholder="Rating 1-5"
              className="border border-gray-600 rounded-md p-2"
            />
            <input
              onChange={(e) => setComment(e.target.value)}
              defaultValue={comment}
              placeholder="comment"
              className="border border-gray-600 rounded-md p-2"
            />
            <div className="flex justify-center">
              <button
                onClick={handleRate}
                className="bg-[#007bff] hover:bg-[#0062cc] py-[6px] px-4 rounded-[3px] w-[50%] text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
