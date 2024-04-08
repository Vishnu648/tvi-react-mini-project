import React, { useState, useEffect } from "react";
import axios from "axios";
import productImg from "../../assets/productImg.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

function WishList({ optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemRemoved, setItemRemoved] = useState(false);

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
        // console.log(res.data.result?.[0]?.results);
        res.data.result?.[0]?.results ? setIsLoading(false) : "";
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
        if (res.status == "200") {
          wishListApiCall();
          setItemRemoved(true)(
            setTimeout(() => {
              setItemRemoved(false);
            }, 2000)
          );
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="px-6 flex-1  overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] relative mt-[1.5rem] leading-[1.2] flex justify-between   ">
        <p className="text-[35px]  text-[#212529] ">WishList</p>
        {itemRemoved ? (
          <div className="border rounded-md absolute right-0 top-[-10px]">
            <Alert />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        WishList
      </div>

      <div className="h-[53vh]  flex flex-wrap lg:flex-row gap-3 justify-center md:justify-center items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {isLoading ? (
          <Loading />
        ) : wishlistItems.length == 0 ? (
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-sm font-medium text-gray-500">
              You haven't added anything to your wishlist yet
            </h2>
          </div>
        ) : (
          wishlistItems?.map((p, i) => {
            if (p.image.length > 0) {
              var imgUrl = p.image[0];
            }

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
                    src={
                      imgUrl ? `data:image/jpeg;base64,${imgUrl}` : productImg
                    }
                    alt="product"
                    className="h-36 mt-5 w-full object-contain hover:scale-[1.02]"
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
    </section>
  );
}

export default WishList;
