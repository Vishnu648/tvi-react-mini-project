import React, { useState, useEffect } from "react";
import demoProImg from "../../assets/demoProImg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";

function Product({ selectedProduct, obj, optionSetter }) {
  const navigate = useNavigate();
  let local_accessToken = localStorage.getItem("accessToken");
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/get-one/${obj._id}`, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setProductDetails(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleAddToCart = () => {
    axios
      .post(`http://localhost:8000/api/add-to-cart/${obj._id}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        {/* <p className="text-[35px]  text-[#212529] ">Product</p> */}
        <button
          onClick={() => optionSetter("store")}
          className="bg-[#343a40] text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        {productDetails.productName
          ? productDetails.productName.toUpperCase()
          : ""}
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-start  my-8 overflow-scroll border rounded-md border-[#e9ecef] relative">
        <img src={demoProImg} alt="pdt" className="h-80 w-52 object-fill" />
        <div
          className="absolute top-1 right-1 text-2xl cursor-pointer"
          onClick={() => console.log("add to favorite")}
        >
          <MdOutlineFavoriteBorder />
        </div>
        <div className=" w-full overflow-scroll h-full p-2 ">
          <div className="flex flex-col gap-6 justify-between  mt-6">
            {productDetails ? (
              <div className=" flex flex-col">
                <p className="text-2xl font-extrabold">
                  {productDetails.productName
                    ? productDetails.productName.toUpperCase()
                    : ""}
                </p>
                <p className="text-3xl font-thin">
                  ₹{productDetails?.productPrice}
                </p>
                <p className="">{productDetails?.productCode}</p>
                {/* <p className="text-4xl">
                  {productDetails?.availability}
                </p> */}
                <p className="">{productDetails?.productDetails}</p>
              </div>
            ) : (
              ""
            )}
            <div className="text-4xl cursor-pointer" onClick={handleAddToCart}>
              <FaCartPlus />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
