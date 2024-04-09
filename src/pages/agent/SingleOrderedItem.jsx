import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import axios from "axios";

function SingleOrderedItem({ obj, optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [productDetails, setProductDetails] = useState();
  const [address, setAddress] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const productDetailsApiCall = () => {
    axios
      .get(`http://localhost:8000/api/my-order-single/${obj?.product?._id}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        if (res.data.result[0].product.image.length > 0) {
          const img = res.data.result[0].product.image[0];
          let imgUrl = img
            ? `data:image/jpeg;base64,${img}`
            : productImg;

          setImageUrl(imgUrl);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log(obj);
    productDetailsApiCall();
  }, []);

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <button
          onClick={() => optionSetter("orderedItems")}
          className="bg-[#343a40] text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Order Details
      </div>
      <div className="h-[53vh] flex flex-wrap lg:flex-row gap-3 justify-center md:justify-start items-center my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        <div className="flex flex-col md:flex-row gap-3 justify-start  my-8 overflow-scroll border rounded-md border-[#e9ecef] w-full relative">
          <img
             src={imageUrl ? imageUrl : productImg}
            alt="pdt"
            className="h-80 w-52 object-contain"
          />
          <div className="absolute top-1 right-1 text-2xl cursor-pointer"></div>
          <div className=" w-full overflow-scroll h-full p-2 ">
            <div className="flex flex-col gap-6 justify-between  mt-6">
              {obj?.product ? (
                <div className=" flex flex-col">
                  <p className="text-xl font-extrabold">
                    {obj?.product.title ? obj?.product.title.toUpperCase() : ""}
                  </p>
                  {obj?.product.discountedPrice ? (
                    <h3 className="text-[#26a541] my-2">Special price</h3>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-mono">
                      ₹{obj?.product?.discountedPrice}
                    </p>
                    <p className="text-xl font-thin">
                      <s>₹{obj?.product?.price}</s>
                    </p>
                    <p className="text-[#26a541] text-xs">
                      {" "}
                      {obj?.product.offer}% off
                    </p>
                  </div>
                  {/* <p className="">{obj?.product?.productCode}</p> */}
                  {obj?.product?.availability == "yes" ? (
                    obj?.product.stock <= 5 ? (
                      <p className="text-sm mb-4 text-red-500">
                        only {obj?.product.stock} left
                      </p>
                    ) : (
                      <p className="text-sm mb-4 text-gray-600">
                        only {obj?.product.stock} left
                      </p>
                    )
                  ) : (
                    <p className="text-red-500 m-4">OUT OF STOCK</p>
                  )}
                  <div className="flex items-center mb-3">
                    <pre className="text-gray-500 text-sm">color : </pre>
                    <pre className={`text-[${obj?.product.color}]`}>
                      {obj?.product.color}
                    </pre>
                  </div>
                  <p className="text-justify">{obj?.product?.description}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleOrderedItem;
