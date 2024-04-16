import axios from "axios";
import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import { IoIosCloseCircle } from "react-icons/io";

function Cart({ optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [imagePath, setImagePath] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemRemoved, setItemRemoved] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  const cartApiCall = () => {
    axios
      .get("http://localhost:8000/api/cart", {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.results);
        if (res.data.results.length > 0) {
          setTotalPrice(res.data.results[0].total);
          setProductDetails(res.data.results[0].results);
          // res.data.results[0].results ? setIsLoading(false) : "";
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsEmpty(true);
        }
        // setProductDetails(res.data.results[0].result);
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

  const checkoutPage = () => {
    optionSetter("order", productDetails, "fromCart", "quantity");
  };

  const handleRemoveFromCart = (obj) => {
    axios
      .delete(`http://localhost:8000/api/delete-cart/${obj.productId}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        cartApiCall();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      {itemRemoved ? (
        <div className="border rounded-md absolute right-10 top-2">
          <Alert message="Success!..." />
        </div>
      ) : (
        ""
      )}

      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Cart</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Cart
      </div>
      <div className="h-[53vh] flex flex-wrap lg:flex-row gap-3 justify-center md:justify-center items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {isLoading ? (
          <Loading />
        ) : isEmpty ? (
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-xl font-medium text-gray-500">
              Your Cart is Empty
            </h2>
            <p className="text-xs">
              Explore our wide selection and find something you like
            </p>
            <button
              className="bg-[#2874ee] text-white px-2 py-1 rounded-sm hover:[#007bff]"
              onClick={() => optionSetter("store")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          productDetails?.map((p, i) => {
            if (p?.image?.length > 0) {
              var imgUrl = p.image[0];
            }

            return (
              <div
                // onClick={() => optionSetter("product", p)}
                key={i}
                className="border shadow-md hover:shadow-2xl relative rounded-md gap-5 object-cover cursor-pointer hover:scale-[1.01]"
              >
                <div>
                  <div
                    className="text-gray-500 absolute top-1 left-1 hover:text-gray-700 "
                    onClick={() => handleRemoveFromCart(p)}
                  >
                    <IoIosCloseCircle size="18px" />
                  </div>
                  <div
                    className="absolute top-1 right-1 "
                    onClick={() => handleAddToWishlist(p._id)}
                  >
                    <MdOutlineFavoriteBorder />
                  </div>
                </div>

                <div
                  onClick={() => optionSetter("product", p, "cartDetails")}
                  className="w-48 py-3"
                >
                  {/* {p.image?.data ? bufferToString(p.image?.data) : null} */}
                  <img
                    src={
                      imgUrl ? `data:image/jpeg;base64,${imgUrl}` : productImg
                    }
                    alt="product"
                    className="h-36 object-contain mt-5 w-full"
                  />
                  <div className="p-2">
                    <p>{p.title}</p>

                    <div className="flex items-center gap-2 ">
                      <p className="text-md font-medium ">
                        ₹{p.discountedPrice}
                      </p>
                      <p className="text-xs text-gray-400">
                        <s>₹{p.price}</s>
                      </p>
                      <p className="text-[#26a541] text-xs"> {p.offer}% off</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {productDetails.length > 0 ? (
        <div className="mt-2 flex justify-between">
          <div className="flex gap-3 ml-8">
            <p className="text-sm text-gray-500">Total Price: </p>
            <p className="font-medium"> ₹ {totalPrice}</p>
          </div>
          <button
            className="bg-[#fb641b] text-white px-7 py-1 rounded-sm font-[500]"
            onClick={checkoutPage}
          >
            Place Order
          </button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default Cart;
