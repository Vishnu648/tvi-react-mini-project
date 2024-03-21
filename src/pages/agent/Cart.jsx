import axios from "axios";
import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function Cart() {
  let local_accessToken = localStorage.getItem("accessToken");
  const [imagePath, setImagePath] = useState("");
  const [productDetails, setProductDetails] = useState([]);

  const getEachProduct = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:8000/api/get-one/${id}`, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setProductDetails((prev) => [...prev, res.data.result]);
        // console.log(res.data.result);

        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(res.data.result?.image?.data))
        );
        setImagePath(base64String);
        // console.log(res.data.result);
      })
      .catch((err) => console.log(err.message));
  };

  const cartApiCall = () => {
    axios
      .get("http://localhost:8000/api/cart", {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        let cart = res.data.cartItems;
        console.log("cart size-", cart.length);
        cart.map((c) => getEachProduct(c.product));
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    cartApiCall();
  }, []);

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Cart</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Cart
      </div>
      <div className="h-[53vh] flex flex-wrap lg:flex-row gap-3 justify-center md:justify-between items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {productDetails.map((p, i) => (
          <div
            // onClick={() => optionSetter("product", p)}
            key={i}
            className="border shadow-md hover:shadow-2xl relative rounded-md gap-5 object-cover cursor-pointer hover:scale-[1.01]"
          >
            <div
              className="absolute top-1 right-1 "
              onClick={() => console.log("add to wishlist")}
            >
              <MdOutlineFavoriteBorder />
            </div>

            <div onClick={() => optionSetter("product", p)}>
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
