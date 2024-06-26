import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { MdEdit } from "react-icons/md";

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

export default function EditAddress({ data, addressApi }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fullName, setFullName] = useState(data.fullName);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber.toString());
  const [alternateNumber, setAlternateNumber] = useState(
    data.alternateNumber.toString()
  );
  const [pincode, setPincode] = useState(data.pincode.toString());
  const [state, setState] = useState(data.state);
  const [city, setCity] = useState(data.city);
  const [buildingName, setBuildingName] = useState(data.buildingName);
  const [area, setArea] = useState(data.area);
  const [landmark, setLandMark] = useState(data.landmark);

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

    axios
      .put(`http://localhost:8000/api/address-edit/${data._id}`, details, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        if(res.status=='200'){
          addressApi();
          handleClose();
        }

      }
      )
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <button className="px-3 py-1 text-black text-xl" onClick={handleOpen}>
        <MdEdit />
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
                  defaultValue={fullName}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  defaultValue={pincode}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="10-digit mobile number"
                  onChange={(e) => setPhoneNumber(e.target.value.toString())}
                  defaultValue={phoneNumber}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="Alternate mobile number"
                  onChange={(e) =>
                    setAlternateNumber(e.target.value.toString())
                  }
                  defaultValue={alternateNumber}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  defaultValue={city}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="State"
                  onChange={(e) => setState(e.target.value)}
                  defaultValue={state}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="LandMark"
                  onChange={(e) => setLandMark(e.target.value)}
                  defaultValue={landmark}
                />
                <input
                  type="text"
                  className="p-2"
                  placeholder="area"
                  onChange={(e) => setArea(e.target.value)}
                  defaultValue={area}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  className="p-2"
                  placeholder="Building Name"
                  onChange={(e) => setBuildingName(e.target.value)}
                  defaultValue={buildingName}
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={handleAddressEdit}
              className=" bg-[#2874f0]  rounded-sm text-white px-3 w-50%"
            >
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
