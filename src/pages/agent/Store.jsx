import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import productImg from "../../assets/productImg.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function Store({ optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [products, setProducts] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [imagePath, setImagePath] = useState("");

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
        setTotalCount(res.data.totalCount);
        // console.log(res.data);
      })
      .catch((err) => console.log("error-", err.message));
  };

  useEffect(() => {
    productApiCall();
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
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Products</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Products
      </div>
      <div className="h-[53vh] flex flex-wrap lg:flex-row gap-3 justify-center md:justify-center items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {products.map((p, i) => {
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
              className="border shadow-md hover:shadow-2xl hover:scale-[1.01] rounded-md gap-5 object-cover cursor-pointer"
            >
              <div
                className="absolute top-1 right-1 "
                onClick={() => handleAddToWishlist(p._id)}
              >
                <MdOutlineFavoriteBorder />
              </div>

              <div onClick={() => optionSetter("product", p)}>
                {/* {p.image?.data ? bufferToString(p.image?.data) : null} */}
                <img
                  src={imgUrl ? imgUrl : productImg}
                  alt="product"
                  className="h-36 mt-5 w-full hover:scale-[1.02]"
                />
                <div className="p-2">
                  <p>{p.productName}</p>
                  <p>${p.productPrice}</p>
                </div>
              </div>
            </div>
          );
        })}
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
