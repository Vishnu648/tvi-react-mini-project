import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import axios from "axios";
import productImg from "../../assets/productImg.jpg";
import { FaArrowDownLong } from "react-icons/fa6";
import Address from "../../components/modals/products/Address";

function Order({ optionSetter, obj, selectedPage }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [address, setAddress] = useState([]);
  const [latestAddress, setLatestAddress] = useState([]);

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
    console.log("ptdDetails", obj);
  }, []);

  const handleContinue = () => {
    console.log("continue");
  };

  const addressSetter=(address) => {
    // console.log(address);
    setLatestAddress(address)
  }
  

  return (
    <section className="px-6 flex-1 relative h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <button
          onClick={() => {
            selectedPage == "cartDetails"
              ? optionSetter("cart")
              : selectedPage == "wishDetails"
              ? optionSetter("wishlist")
              : optionSetter("store");
          }}
          className="bg-[#343a40] text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
      <div className="h-[65vh] overflow-scroll">
        <div className="bg-[#e9ecef] relative py-3 flex items-center px-4 rounded-sm text-[1rem] mb-2">
          <div className="relative w-full">
            <h6>Deliver to:</h6>
            <p className="font-semibold">{latestAddress?.fullName}</p>
            <p className="font-serif">{`${latestAddress?.buildingName}, ${latestAddress?.area}, ${latestAddress?.city} `}</p>
            <p className="font-serif">{latestAddress?.pincode}</p>
            <p>{latestAddress?.phoneNumber}</p>

            <Address address={address} addressSetter={addressSetter} />
          </div>
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
            <select className="border border-gray-400 w-[50%] ml-[5px] my-1 rounded-sm">
              <option className="">1</option>
              <option className="">2</option>
              <option className="">3</option>
            </select>
          </div>
        </div>

        <div className="bg-[#e9ecef] relative py-3 flex flex-col px-4 rounded-sm text-[1rem] mb-2">
          <h4 className="font-medium my-4">Price Details</h4>
          <div>
            <div className="flex justify-between">
              <p className="font-serif">Price</p>
              <p className="text-sm">₹ {obj.price}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-serif">Discount</p>
              <p className="text-sm text-[green]">
                - {obj.price - obj.discountedPrice}
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
              <p className="font-semibold">₹ {obj.discountedPrice}</p>
            </div>

            <h4 className="font-medium text-[green] my-4">{`You will save ₹${
              obj.price - obj.discountedPrice
            } on this order`}</h4>
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