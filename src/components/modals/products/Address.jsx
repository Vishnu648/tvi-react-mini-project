import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import AddressEdit from "./AddressEdit";
import DeleteModal from "../DeleteModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Address({ address, addressSetter, addressApi }) {
  const [open, setOpen] = React.useState(false);
  const local_accessToken = localStorage.getItem("accessToken");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsAddAddressVisible(false);
    setOpen(false);
  };
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);
  const [fullName, setFullName] = useState("demo address");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [alternateNumber, setAlternateNumber] = useState("0987654321");
  const [pincode, setPincode] = useState("123456");
  const [state, setState] = useState("state");
  const [city, setCity] = useState("city");
  const [buildingName, setBuildingName] = useState("name");
  const [area, setArea] = useState("area");
  const [landmark, setLandMark] = useState("landmark");

  const handleAddressChange = () => {
    handleOpen();
  };

  useEffect(() => {
    console.log("add", address);
  }, []);

  const AddressChanger = (adrs) => {
    setSelectedAddress(adrs);
  };

  const handleSubmit = () => {
    selectedAddress._id ? addressSetter(selectedAddress) : "";
    handleClose();
  };

  const handleAddAddress = () => {
    setIsAddAddressVisible(true);
  };

  const handleAddressSave = () => {
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
      .post("http://localhost:8000/api/address", details, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        if (res.status == "200") {
          setIsAddAddressVisible(false);
          addressApi();
        }
      })
      .catch((err) => console.log(err.message));
  };

  const hanldeAddressDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete-address/${id}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        if (res.status == "200") {
          addressApi();
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <button
        onClick={handleAddressChange}
        className="absolute right-0 top-0 border border-gray-300 text-[#347cf0] text-sm px-5 py-1 rounded-[3px]"
      >
        CHANGE
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="border rounded-md w-full max-h-[96vh] overflow-scroll relative"
        >
          <h1 className="font-bold">DELIVERY ADDRESS</h1>
          <p className="text-xs text-gray-500 my-2">
            Please select your current address:
          </p>
          <div className="flex flex-col mb-2 border border-gray-300 rounded-md overflow-scroll">
            {address.map((a) => (
              <div
                key={a._id}
                className="flex m-2 border border-gray-400 rounded-md p-3  "
              >
                <label
                  className="flex flex-col relative items-start w-full"
                  onClick={(e) => AddressChanger(a)}
                >
                  <div className="flex gap-2">
                    <input type="radio" name="address" />
                    <p className="font-semibold">{a?.fullName}</p>
                  </div>
                  <p className="font-serif">{`${a?.buildingName}, ${a?.area}, ${a?.city} `}</p>
                  <p className="font-serif">{a?.pincode}</p>
                  <p>{a?.phoneNumber}</p>
                  <div className="absolute top-2 right-0 flex gap-5 ">
                    <AddressEdit data={a} addressApi={addressApi} />
                    {/* {console.log('a',a)} */}
                    <button
                      className="px-3"
                      // onClick={() => hanldeAddressDelete(a._id)}
                    >
                      <DeleteModal
                        handleDelete={hanldeAddressDelete}
                        id={a._id}
                      />
                    </button>
                  </div>
                </label>
              </div>
            ))}
          </div>
          {isAddAddressVisible ? (
            <div className="bg-[#e9ecef] relative py-3 flex items-center px-4 rounded-sm text-[1rem] mb-2">
              <form className="flex flex-col w-full gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="p-2"
                    placeholder="FullName"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                  <input
                    type="text"
                    className="p-2"
                    placeholder="6 digit pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="p-2"
                    placeholder="10-digit mobile number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                  <input
                    type="text"
                    className="p-2"
                    placeholder="Alternate mobile number"
                    onChange={(e) => setAlternateNumber(e.target.value)}
                    value={alternateNumber}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="p-2"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                  <input
                    type="text"
                    className="p-2"
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="p-2"
                    placeholder="LandMark"
                    onChange={(e) => setLandMark(e.target.value)}
                    value={landmark}
                  />
                  <input
                    type="text"
                    className="p-2"
                    placeholder="area"
                    onChange={(e) => setArea(e.target.value)}
                    value={area}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    className="p-2"
                    placeholder="Building Name"
                    onChange={(e) => setBuildingName(e.target.value)}
                    value={buildingName}
                  />
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between items-center px-2 ">
            {isAddAddressVisible ? (
              <div className="flex items-center gap-8 w-full justify-end">
                <p
                  onClick={() => setIsAddAddressVisible(false)}
                  className=" text-[#2874f0] cursor-pointer"
                >
                  CANCEL
                </p>
                <button
                  className="text-white bg-[#fb641b] px-4 py-2 rounded-sm "
                  onClick={handleAddressSave}
                >
                  SAVE
                </button>
              </div>
            ) : (
              <p
                onClick={handleAddAddress}
                className=" text-[#2874f0] cursor-pointer"
              >
                + Add a new Address
              </p>
            )}
            {isAddAddressVisible ? (
              ""
            ) : (
              <button
                onClick={handleSubmit}
                className="text-white bg-[#fb641b] px-4 py-2 rounded-sm "
              >
                DELIVER HERE
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
