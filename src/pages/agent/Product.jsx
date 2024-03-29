import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { useSelector } from "react-redux";

function Product({ selectedProduct, obj, optionSetter, selectedPage }) {
  const navigate = useNavigate();
  let local_accessToken = localStorage.getItem("accessToken");
  const [productDetails, setProductDetails] = useState({});
  const tokens = useSelector((state) => state.token);
  const [imagePath, setImagePath] = useState("");

  const productApiCall = () => {
    console.log("obj--", obj);
    axios
      .get(
        `http://localhost:8000/api/get-one/${
          selectedPage == "cartDetails" || selectedPage == "wishDetails"
            ? obj.productId
            : obj._id
        }`,
        {
          headers: {
            genericvalue: "admin",
            Authorization: local_accessToken,
          },
        }
      )
      .then((res) => {
        {
          setProductDetails(res.data.result);
          console.log(res.data.result);

          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(res.data.result?.image?.data))
          );
          setImagePath(base64String);
          // console.log(base64String)
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    // console.log(obj);
    productApiCall();
  }, []);

  const handleAddToCart = (e) => {
    let details = {};
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/api/add-to-cart/${productDetails._id}`,
        details,
        {
          headers: {
            genericvalue: "admin",
            Authorization: local_accessToken,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  const handlePurchase = () => {
    console.log("purchase");
  };

  const handleAddToWishlist = (id) => {
    axios
      .post(
        `http://localhost:8000/api/add-to-wishlist/${id}`,
        {},
        {
          headers: {
            genericvalue: "agent",
            Authorization: local_accessToken,
          },
        }
      )
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err.message));
  };

  const handleRemoveFromCart = () => {
    axios.delete(`http://localhost:8000/api/delete-cart/${productDetails._id}`,{
      headers:{
        genericvalue: "agent",
        Authorization: local_accessToken,
      }
    }).then(res=>console.log(res))
    .catch(err=>console.log(err.message))
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        {/* <p className="text-[35px]  text-[#212529] ">Product</p> */}
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
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        {productDetails.productName
          ? productDetails.productName.toUpperCase()
          : ""}
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-start  my-8 overflow-scroll border rounded-md border-[#e9ecef] relative">
        <img
          src={imagePath ? `data:image/png;base64,${imagePath}` : productImg}
          alt="pdt"
          className="h-80 w-52 object-contain"
        />
        <div
          className="absolute top-1 right-1 text-2xl cursor-pointer"
          onClick={() => handleAddToWishlist(productDetails._id)}
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
                {/* <p className="">{productDetails?.productCode}</p> */}
                {productDetails?.availability == "yes" ? (
                  obj.stock <= 5 ? (
                    <p className="text-sm m-4 text-red-500">
                      only {obj.stock} left
                    </p>
                  ) : (
                    <p className="text-sm m-4 text-gray-600">
                      only {obj.stock} left
                    </p>
                  )
                ) : (
                  <p className="text-red-500 m-4">OUT OF STOCK</p>
                )}
                <p className="text-justify">{productDetails?.productDetails}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className=" flex justify-evenly">
        {selectedPage == "cartDetails" ? (
          <div
            className="flex items-center cursor-pointer rounded-md bg-[#ff9f00] hover:bg-[#ff9f39] text-white justify-center  w-40 py-3"
            onClick={handleRemoveFromCart}
          >
            <FaCartPlus size={"25px"} />
            Remove product
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer rounded-md bg-[#ff9f00] hover:bg-[#ff9f39] text-white justify-center  w-40 py-3 "
            onClick={handleAddToCart}
          >
            <FaCartPlus size={"25px"} />
            ADD TO CART
          </div>
        )}

        <div
          onClick={handlePurchase}
          className="flex items-center cursor-pointer rounded-lg bg-[#fb641b] hover:bg-[#fb643e] justify-center text-white w-40 py-3"
        >
          <AiFillThunderbolt />
          BUY NOW
        </div>
      </div>
    </section>
  );
}

export default Product;
