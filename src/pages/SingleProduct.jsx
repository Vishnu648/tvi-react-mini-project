import axios from "axios";
import React, { useEffect, useState } from "react";
import demoProImg from "../assets/demoProImg.jpg";

function SingleProduct({ id, selectedOption }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/get-one/${id}`, {
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

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        {/* <p className="text-[35px]  text-[#212529] ">Product</p> */}
        <button
          onClick={() => selectedOption("products")}
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

      <div className="flex flex-col md:flex-row gap-3 justify-start items-center my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        <img src={demoProImg} alt="pdt" className="h-80 w-52 object-fill" />
        <div className="border border-red-500 w-full overflow-scroll h-60 p-2">
          {productDetails ? (
            <>
              <p className="text-4xl">{productDetails?.productName.toUpperCase()}</p>
              <p className="text-4xl">{productDetails?.productPrice}</p>
              <p className="text-4xl">{productDetails?.productCode}</p>
              <p className="text-4xl">{productDetails?.productAvailability}</p>
              <p className="text-4xl ">{productDetails?.productDetails}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
