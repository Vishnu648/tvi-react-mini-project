import React, { useState, useEffect } from "react";
import axios from "axios";
import productImg from "../../assets/productImg.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoHeart } from "react-icons/io5";

function WishList({ optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [wishlistItems, setWishlistItems] = useState([]);

  const wishListApiCall = () => {
    axios
      .get("http://localhost:8000/api/wishlist", {
        headers: {
          agent: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setWishlistItems(res.data.result?.[0]?.results);
        console.log(res.data.result?.[0]?.results);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    wishListApiCall();
  }, []);

  const handleRemoveFromWishList = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete-wishist/${id}`, {
        headers: {
          agent: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log(res)
        res.status == "200" ? wishListApiCall() : "";
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">WishList</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        WishList
      </div>

      <div className="h-[53vh]  flex flex-wrap lg:flex-row gap-3 justify-center md:justify-center items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {wishlistItems?.map((p, i) => {
          const base64String = p.image?.data
            ? btoa(String.fromCharCode(...new Uint8Array(p.image?.data)))
            : null;
          const imgUrl = base64String
            ? `data:image/jpeg;base64,${base64String}`
            : productImg;

          return (
            <div
              // onClick={() => optionSetter("product", p)}
              key={p._id}
              className="border shadow-md relative hover:shadow-2xl hover:scale-[1.01] rounded-md gap-5 object-cover cursor-pointer"
            >
              <div
                className="absolute top-1 right-1 text-red-600"
                onClick={() => handleRemoveFromWishList(p._id)}
              >
                <IoHeart />
              </div>

              <div
                onClick={() => optionSetter("product", p, "wishDetails")}
                className="w-48 py-3"
              >
                {/* {p.image?.data ? bufferToString(p.image?.data) : null} */}
                <img
                  src={imgUrl ? imgUrl : productImg}
                  alt="product"
                  className="h-36 mt-5 w-full object-contain hover:scale-[1.02]"
                />
                <div className="p-2">
                  <p>{p.title}</p>
                  <div className="flex items-center gap-2 ">
                    <p className="text-md font-medium ">₹{p.discountedPrice}</p>
                    <p className="text-xs text-gray-400">
                      <s>₹{p.price}</s>
                    </p>
                    <p className="text-[#26a541] text-xs"> {p.offer}% off</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WishList;
