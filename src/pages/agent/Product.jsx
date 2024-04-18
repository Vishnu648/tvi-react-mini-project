import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoHeart } from "react-icons/io5";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import StarRating from "../../components/StarRating";
import ProductRating from "../../components/ProductRating";

function Product({ selectedProduct, obj, optionSetter, selectedPage }) {
  const navigate = useNavigate();
  let local_accessToken = localStorage.getItem("accessToken");
  const [productDetails, setProductDetails] = useState({});
  const tokens = useSelector((state) => state.token);
  const [imagePath, setImagePath] = useState("");
  const [itemRemoved, setItemRemoved] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [ratingDetails, setRatingDetails] = useState([]);
  const [wishIds, setWishIds] = useState([]);

  const productApiCall = () => {
    console.log("obj--", obj);
    axios
      .get(
        `http://localhost:8000/api/get-one/${
          selectedPage == "cartDetails" ? obj.productId : obj._id
        }`,
        {
          headers: {
            genericvalue: "agent",
            Authorization: local_accessToken,
          },
        }
      )
      .then((res) => {
        {
          setProductDetails(res.data.result);
          // ratingApiCall(res.data.result._id);
          console.log('productDetails--',res.data.result);
          res.data.result ? setIsLoading(false) : "";

          axios
            .get("http://localhost:8000/api/wishlist", {
              headers: {
                agent: "agent",
                Authorization: local_accessToken,
              },
            })
            .then((res) => {
              // console.log('wishid',res.data.result?.[0]?.results);
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

          if (res.data.result?.image.length > 0) {
            const base64String = btoa(
              String.fromCharCode(
                ...new Uint8Array(res.data.result?.image?.[0].data)
              )
            );
            setImagePath(base64String);
            // console.log(base64String)
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  const ratingApiCall = () => {
    console.log('obj_id--',obj._id)
    axios
      .get(`http://localhost:8000/api/get_review/${'661f4e045b1572d90c44ea94'}`, {
        headers: {
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setRatingDetails(res.data.result?.[0]?.reviews);
        console.log("rating---",res.data.result?.[0]?.reviews);
        localStorage.setItem(
          "rating",
          JSON.stringify(res.data.result?.[0]?.reviews)
        );
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    // console.log(obj);
    productApiCall();
    ratingApiCall();
    // console.log(obj._id)
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
      .then((res) => {
        if (res.status == "200") {
          setItemRemoved(true)(
            setTimeout(() => {
              setItemRemoved(false);
            }, 2000)
          );
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handlePurchase = () => {
    // console.log("purchase");
    optionSetter("order", productDetails, "fromProduct", quantity);
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
        productApiCall();
        console.log(res.data.message);
      })
      .catch((err) => console.log(err.message));
  };

  const handleRemoveFromCart = () => {
    axios
      .delete(`http://localhost:8000/api/delete-cart/${productDetails._id}`, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then(
        (res) =>
          res.status == "200"
            ? setItemRemoved(true)(
                setTimeout(() => {
                  setItemRemoved(false);
                  optionSetter("cart");
                }, 1000)
              )
            : ""
        // console.log(res)
      )
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
        if (res.status == "200") {
          setItemRemoved(true);
          setWishIds(wishIds.filter((e) => e != id));
          productApiCall();
        }

        // (
        //     setTimeout(() => {
        //       setItemRemoved(false);
        //     }, 2000)
        //   )
      })
      .catch((err) => console.log(" "));
  };

  return (
    <section className="px-6 flex-1 relative overflow-scroll h-[92vh] pb-5">
      {itemRemoved ? (
        <div className="border rounded-md absolute right-10 top-2">
          <Alert message="Success!..." />
        </div>
      ) : (
        ""
      )}

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
        {productDetails.title ? productDetails.title.toUpperCase() : ""}
      </div>
      {isLoading ? (
        <div className=" flex justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="flex flex-col lg:flex-row gap-3 flex-1 lg:justify-between my-8 overflow-scroll border rounded-md border-[#e9ecef] relative">
            <div className="flex flex-col flex-1 md:flex-row gap-3 justify-start overflow-scroll rounded-md relative">
              <img
                src={
                  imagePath ? `data:image/png;base64,${imagePath}` : productImg
                }
                alt="pdt"
                className="h-80 w-52 object-contain"
              />
              <div className="absolute top-1 right-1 text-2xl cursor-pointer">
                {selectedPage == "wishDetails" ? (
                  <div
                    className="absolute top-1 right-1 text-red-600"
                    onClick={() => handleRemoveFromWishList(productDetails._id)}
                  >
                    <IoHeart />
                  </div>
                ) : wishIds.includes(productDetails._id) ? (
                  <div
                    className="absolute top-1 right-1  text-red-600"
                    onClick={() => handleRemoveFromWishList(productDetails._id)}
                  >
                    <IoHeart />
                  </div>
                ) : (
                  <div
                    className="absolute top-1 right-1 "
                    onClick={() => handleAddToWishlist(productDetails._id)}
                  >
                    <MdOutlineFavoriteBorder />
                  </div>
                )}
              </div>
              <div className=" w-full overflow-scroll h-full p-2 ">
                <div className="flex flex-col gap-6 justify-between  mt-6">
                  {productDetails ? (
                    <div className=" flex flex-col">
                      <p className="text-xl font-extrabold">
                        {productDetails.title
                          ? productDetails.title.toUpperCase()
                          : ""}
                      </p>
                      {productDetails.discountedPrice ? (
                        <h3 className="text-[#26a541] my-2">Special price</h3>
                      ) : (
                        ""
                      )}
                      <div className="flex items-center gap-3">
                        <p className="text-3xl font-mono">
                          ₹{productDetails?.discountedPrice}
                        </p>
                        <p className="text-xl font-thin">
                          <s>₹{productDetails?.price}</s>
                        </p>
                        <p className="text-[#26a541] text-xs">
                          {" "}
                          {productDetails.offer}% off
                        </p>
                      </div>
                      {/* <p className="">{productDetails?.productCode}</p> */}
                      {productDetails?.availability == "yes" ? (
                        obj.stock <= 5 ? (
                          <p className="text-sm mb-4 text-red-500">
                            only {obj.stock} left
                          </p>
                        ) : (
                          <p className="text-sm mb-4 text-gray-600">
                            only {obj.stock} left
                          </p>
                        )
                      ) : (
                        <p className="text-red-500 m-4">OUT OF STOCK</p>
                      )}
                      <div className="flex items-center mb-3">
                        <pre className="text-gray-500 text-sm">color : </pre>
                        <pre className={`text-[${productDetails.color}]`}>
                          {productDetails.color}
                        </pre>
                      </div>
                      <p className="text-justify">
                        {productDetails?.description}
                      </p>
                      <select
                        className="border border-gray-400 w-[10%] my-3 rounded-sm"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      >
                        <option className="">1</option>
                        <option className="">2</option>
                        <option className="">3</option>
                        <option className="">4</option>
                        <option className="">5</option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* <div className="md:w-[20vw] px-2 py-5 font-medium">
              <h2>Ratings</h2>
              <StarRating obj={productDetails} />
            </div> */}
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
        </div>
      )}
    </section>
  );
}

export default Product;
