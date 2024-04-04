import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditAddress({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandMark] = useState("");

  const handleAddressEdit = () => {
    const details = {
      fullName,
      phoneNumber,
      alternateNumber,
      pincode,
      state,
      city,
      buildingName,
      area,
      landmark,
    };
    console.log("newAdrs", details);
  };

  return (
    <div>
      <button className="border text-[#2874f0] px-3" onClick={handleOpen}>
        Edit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <div className="bg-[#e9ecef] relative py-3 flex items-center px-4 rounded-sm text-[1rem] mb-2">
            <form className="flex flex-col w-full gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="FullName"
                  onChange={(e) => setFullName(e.target.value)}
                  defaultValue={data.fullName}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  defaultValue={data.pincode}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="10-digit mobile number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  defaultValue={data.phoneNumber}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="Alternate mobile number"
                  onChange={(e) => setAlternateNumber(e.target.value)}
                  defaultValue={data.alternateNumber}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  defaultValue={data.city}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="State"
                  onChange={(e) => setState(e.target.value)}
                  defaultValue={data.state}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="LandMark"
                  onChange={(e) => setLandMark(e.target.value)}
                  defaultValue={data.landmark}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="area"
                  onChange={(e) => setArea(e.target.value)}
                  defaultValue={data.area}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="Building Name"
                  onChange={(e) => setBuildingName(e.target.value)}
                  defaultValue={data.buildingName}
                />
              </div>
            </form>
          </div>
          <button
            onClick={handleAddressEdit}
            className="border text-[#2874f0] px-3"
          >
            Update
          </button>
        </Box>
      </Modal>
    </div>
  );
}
