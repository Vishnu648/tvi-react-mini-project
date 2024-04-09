import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import productImg from "../../assets/productImg.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

function Store({ optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [products, setProducts] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [imagePath, setImagePath] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [ptdIds, setPtdIds] = useState([]);
  const [wishIds, setWishIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemRemoved, setItemRemoved] = useState(false);
  const [isError, setIsError] = useState(false);

  const productApiCall = (pn = 1) => {
    axios
      .get(`http://localhost:8000/api/getProdt?page=${pn}`, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        res.data.products.length > 0 ? setIsLoading(false) : "";
        setTotalCount(res.data.totalCount);
        let pdt = res.data.products;

        axios
          .get("http://localhost:8000/api/wishlist", {
            headers: {
              agent: "agent",
              Authorization: local_accessToken,
            },
          })
          .then((res) => {
            setWishlistItems(res.data.result?.[0]?.results);
            let wish = res.data.result?.[0]?.results;
            // console.log(pdt);
            // console.log(wish);
            wish.map((e) => {
              !wishIds.includes(e._id)
                ? setWishIds((prev) => [...prev, e._id])
                : "";
            });
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        console.error("error-", err.message);
        setIsError(true);
        setIsLoading(false);
      });
  };

  // const wishListApiCall = () => {
  //   axios
  //     .get("http://localhost:8000/api/wishlist", {
  //       headers: {
  //         agent: "agent",
  //         Authorization: local_accessToken,
  //       },
  //     })
  //     .then((res) => {
  //       setWishlistItems(res.data.result?.[0]?.results);
  //       console.log(res.data.result?.[0]?.results);
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  useEffect(() => {
    productApiCall();
    // wishListApiCall();
  }, []);

  const selectedPage = (pageNo) => {
    productApiCall(pageNo);
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
      .then((res) => {
        if (res.status == "200") {
          productApiCall();
          setItemRemoved(true)(
            setTimeout(() => {
              setItemRemoved(false);
            }, 1400)
          );
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleRemoveFromWishList = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete-wishist/${id}`, {
        headers: {
          agent: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log(res.status);
        setWishIds(wishIds.filter((e) => e != id));
        productApiCall();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] relative mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Products</p>
        {itemRemoved ? (
          <div className="border rounded-md absolute right-0 top-[-10px]">
            <Alert message="add to wishlist" />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Products
      </div>
      <div className="h-[55vh] flex flex-wrap lg:flex-row gap-3 justify-center md:justify-center items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-sm font-medium text-gray-500">
              Something went wrong...
            </h2>
            <p className="text-red-600">Please try again...</p>
          </div>
        ) : (
          products.map((p, i) => {
            if (p.image.length > 0) {
              const base64String = p.image[0].data
                ? btoa(String.fromCharCode(...new Uint8Array(p.image[0].data)))
                : null;
              var imgUrl = base64String
                ? `data:image/jpeg;base64,${base64String}`
                : productImg;
            }

            return (
              <div
                // onClick={() => optionSetter("product", p)}
                key={p._id}
                className="border shadow-md hover:shadow-2xl relative rounded-md gap-5 object-cover cursor-pointer hover:scale-[1.01]"
              >
                {wishIds.includes(p._id) ? (
                  <div
                    className="absolute top-1 right-1  text-red-600"
                    onClick={() => handleRemoveFromWishList(p._id)}
                  >
                    <IoHeart />
                  </div>
                ) : (
                  <div
                    className="absolute top-1 right-1 "
                    onClick={() => handleAddToWishlist(p._id)}
                  >
                    <MdOutlineFavoriteBorder />
                  </div>
                )}

                <div
                  onClick={() => optionSetter("product", p, "storeDetails")}
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
      {totalCount > 10 ? (
        <Pagination
          pages={Math.ceil(totalCount / 10)}
          selectedPage={selectedPage}
        />
      ) : (
        ""
      )}
    </section>
  );
}

export default Store;
