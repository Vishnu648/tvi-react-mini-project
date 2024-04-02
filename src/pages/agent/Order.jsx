import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import axios from "axios";

function Order({ optionSetter, obj, selectedPage }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [address, setAddress] = useState([]);

  const addressApi = () => {
    axios
      .get(`http://localhost:8000/api/address-view/${obj._id}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => console.log(res.data.result?.[0].address?.[3]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    addressApi();
  }, []);

  return (
    <section className="px-6 flex-1 relative overflow-scroll h-[92vh] pb-5">
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
      <div className="bg-[#e9ecef] relative  h-12 flex items-center px-4 rounded-sm text-[1rem] mb-2">
        <div className="">
        <select>
          
        </select>
          <h6>Deliver to:</h6>
          <p>{}</p>
        </div>
      </div>
    </section>
  );
}

export default Order;
