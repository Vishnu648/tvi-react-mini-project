import axios from "axios";
import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function Cart({ optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [imagePath, setImagePath] = useState("");
  const [productDetails, setProductDetails] = useState([]);

  const cartApiCall = () => {
    axios
      .get("http://localhost:8000/api/cart", {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.result.products)
        setProductDetails(res.data.result.products);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    cartApiCall();
  }, []);

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

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Cart</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Cart
      </div>
      <div className="h-[53vh] flex flex-wrap lg:flex-row gap-3 justify-center md:justify-center items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {productDetails.map((p, i) => (
          <div
            // onClick={() => optionSetter("product", p)}
            key={i}
            className="border shadow-md hover:shadow-2xl relative rounded-md gap-5 object-cover cursor-pointer hover:scale-[1.01]"
          >
            <div
              className="absolute top-1 right-1 "
              onClick={() => handleAddToWishlist(p._id)}
            >
              <MdOutlineFavoriteBorder />
            </div>

            <div onClick={() => optionSetter("product", p, "cartDetails")}>
              {/* {p.image?.data ? bufferToString(p.image?.data) : null} */}
              <img
                src={productImg}
                alt="product"
                className="h-36 mt-5 w-full"
              />
              <div className="p-2">
                <p>{p.productName}</p>
                <p>${p.productPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cart;
