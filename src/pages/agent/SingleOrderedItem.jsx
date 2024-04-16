import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import axios from "axios";
import RateProduct from "../../components/modals/products/RateProduct";
import { FaStar } from "react-icons/fa6";
import StarRating from "../../components/StarRating";

function SingleOrderedItem({ obj, optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [productDetails, setProductDetails] = useState();
  const [address, setAddress] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [ratingDetails, setRatingDetails] = useState([]);

  const productDetailsApiCall = () => {
    axios
      .get(`http://localhost:8000/api/my-order-single/${obj?.product?._id}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setProductDetails(res.data.results[0]);
        // console.log(res.data);
        // if (res.data.results[0].product.image.length > 0) {
        //   const img = res.data.result[0].product.image[0];
        //   let imgUrl = img ? `data:image/jpeg;base64,${img}` : productImg;

        //   setImageUrl(imgUrl);
        // }
      })
      .catch((err) => console.log(err.message));
  };

  const ratingApiCall = () => {
    console.log(obj._id)
    axios
      .get(`http://localhost:8000/api/get_review/${obj._id}`, {
        headers: {
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log("rating res------", res.data.result?.[0]?.reviews);
        localStorage.setItem(
          "orderedRating",
          JSON.stringify(res.data.result?.[0]?.reviews)
        );
        setRatingDetails(res.data.result?.[0]?.reviews);
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    console.log("obj--", obj);
    ratingApiCall();
    if (obj?.product?.image.length > 0) {
      const img = obj?.product?.image[0];

      let imgUrl = img ? `data:image/jpeg;base64,${img}` : productImg;

      setImageUrl(imgUrl);
    }
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
      <div className="h-[58vh] flex flex-wrap lg:flex-row gap-3 justify-center md:justify-start items-center my-2 overflow-scroll border rounded-md border-[#e9ecef] ">
        <div className="relative w-full p-5 flex flex-col md:flex-row justify-between">
          <div className="">
            <h6>Delivered to:</h6>
            <p className="font-semibold">
              {productDetails?.matchedAddress?.fullName}
            </p>
            <p className="font-serif">{`${productDetails?.matchedAddress?.buildingName}, ${productDetails?.matchedAddress?.area}, ${productDetails?.matchedAddress?.city} `}</p>
            <p className="font-serif">
              {productDetails?.matchedAddress?.pincode}
            </p>
            <p>
              {productDetails?.matchedAddress?.phoneNumber},
              {productDetails?.matchedAddress?.alternateNumber}
            </p>
          </div>
          <div className="flex flex-1 ">
            <StarRating ratingDetails={ratingDetails} />
          </div>
        </div>
        <div className="flex w-full flex-col xl:flex-row">
          <div className="flex flex-col md:flex-row gap-3 justify-start overflow-scroll rounded-md w-full relative">
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
                      {obj?.product.title
                        ? obj?.product.title.toUpperCase()
                        : ""}
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
          <div
            className="flex  flex-col gap-3
          justify-center pl-8 overflow-scroll rounded-md w-full relative"
          >
            <div className="flex gap-2">
              <p className="text-gray-500 text-sm">Status:</p>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    productDetails?.status == "pending"
                      ? "bg-orange-400"
                      : "bg-black"
                  }`}
                ></div>
                <p>{productDetails?.status}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <p className="text-gray-500 text-sm">Order Date:</p>
              <p>{productDetails?.orderConfirmed}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 float-right">
        <RateProduct productId={obj._id} />
      </div>
    </section>
  );
}

export default SingleOrderedItem;
