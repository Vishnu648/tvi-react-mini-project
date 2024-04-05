import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import axios from "axios";
import productImg from "../../assets/productImg.jpg";
import { FaArrowDownLong } from "react-icons/fa6";
import Address from "../../components/modals/products/Address";

function Order({ optionSetter, obj, selectedPage, productQuantity }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [address, setAddress] = useState([]);
  const [latestAddress, setLatestAddress] = useState([]);
  const [quantity, setQuantity] = useState(productQuantity);
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandMark] = useState("");

  const addressApi = () => {
    axios
      .get(`http://localhost:8000/api/address-view/${obj._id}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setAddress(res.data.result?.[0].address);
        setLatestAddress(res.data.result?.[0].address?.[0]);
        console.log(res.data.result?.[0].address);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    addressApi();
    // console.log("ptdDetails", obj._id);
  }, []);

  const handleContinue = () => {
    console.log("continue");
  };

  const addressSetter = (address) => {
    // console.log(address);
    setLatestAddress(address);
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
          handleCancel();
          addressApi();
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleCancel = () => {
    setIsAddAddressVisible(false);
    setFullName("");
    setPhoneNumber("");
    setAlternateNumber("");
    setPincode("");
    setState("");
    setCity("");
    setBuildingName("");
    setArea("");
    setLandMark("");
  };

  return (
    <section className="px-6 flex-1 relative h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <button
          onClick={() => {
            optionSetter("product", obj, "storeDetails");
          }}
          className="bg-[#343a40] text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
      <div className="h-[65vh] overflow-scroll">
        <div className="bg-[#e9ecef] relative py-3 flex justify-center items-center px-4 rounded-sm text-[1rem] mb-2">
          {latestAddress? (
            <div className="relative w-full">
              <h6>Deliver to:</h6>
              <p className="font-semibold">{latestAddress?.fullName}</p>
              <p className="font-serif">{`${latestAddress?.buildingName}, ${latestAddress?.area}, ${latestAddress?.city} `}</p>
              <p className="font-serif">{latestAddress?.pincode}</p>
              <p>{latestAddress?.phoneNumber}</p>

              <Address
                address={address}
                addressSetter={addressSetter}
                addressApi={addressApi}
              />
            </div>
          ) : (
            <div className="w-full">
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
                        placeholder="pincode"
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
              <div>
                {isAddAddressVisible ? (
                  <div className="flex items-center gap-8 w-full justify-end">
                    <p
                      onClick={handleCancel}
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
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#e9ecef] relative py-3 flex items-center px-4 rounded-sm text-[1rem] mb-2">
          <div className="grid grid-cols-2">
            <img
              height={100}
              width={100}
              className="object-contain border"
              src={productImg}
            />
            <div>
              <h4 className="font-medium">{obj.title}</h4>
              <pre className={`text-${obj.color}`}>{obj.color}</pre>
              <pre className="flex items-center my-2 text-[#26a541] gap-1">
                <FaArrowDownLong />
                {obj.offer}% <s className="text-gray-500">₹{obj.price}</s>
                <b>₹{obj.discountedPrice}</b>
              </pre>
            </div>
            <select
              className="border border-gray-400 w-[50%] ml-[5px] my-1 rounded-sm"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            >
              <option className="">1</option>
              <option className="">2</option>
              <option className="">3</option>
              <option className="">4</option>
            </select>
          </div>
        </div>

        <div className="bg-[#e9ecef] relative py-3 flex flex-col px-4 rounded-sm text-[1rem] mb-2">
          <h4 className="font-medium my-4">Price Details</h4>
          <div>
            <div className="flex justify-between">
              <p className="font-serif">Price</p>
              <p className="text-sm">₹ {obj.price * quantity}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-serif">Discount</p>
              <p className="text-sm text-[green]">
                - {(obj.price - obj.discountedPrice) * quantity}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-serif">Delivery Charge</p>
              <div className="flex gap-2 text-sm">
                <s>₹40</s>
                <div className="text-[green]">FREE DELIVERY</div>
              </div>
            </div>

            <div className="flex justify-between my-4">
              <p className="font-medium">Total Amount</p>
              <p className="font-semibold">
                ₹ {obj.discountedPrice * quantity}
              </p>
            </div>

            <pre className="font-semibold text-[green] my-4 flex items-center">
              You will save ₹
              <p className="font-bold text-xl">
                {(obj.price - obj.discountedPrice) * quantity}{" "}
              </p>
              on this order
            </pre>
          </div>
        </div>
      </div>
      <div className="border border-gray-400 rounded-md flex relative justify-around p-3 mt-2">
        <div className="w-full">
          <s className="text-xs">{obj.price}</s>
          <p className="font-[500]">₹{obj.discountedPrice}</p>
        </div>
        <button
          onClick={handleContinue}
          className="bg-[#fb641b] text-white px-7 rounded-sm font-[500]"
        >
          Continue
        </button>
      </div>
    </section>
  );
}

export default Order;
