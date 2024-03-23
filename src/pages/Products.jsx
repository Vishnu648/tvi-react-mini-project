import axios from "axios";
import React, { useState, useEffect } from "react";
import productImg from "../assets/productImg.jpg";
import AddProducts from "../components/modals/AddProducts";
import Pagination from "../components/Pagination";

function AddProduct({ selectedOption }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [products, setProducts] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [totalCount, setTotalCount] = useState(0);

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

  const bufferToString = (bfr) => {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(bfr)));

    setImgUrl(base64String);
  };

  const selectedPage = (pageNo) => {
    productApiCall(pageNo);
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Products</p>
        <AddProducts productApiCall={productApiCall} />
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
              onClick={() => selectedOption("product", p)}
              key={p._id}
              className="border shadow-md hover:shadow-2xl hover:scale-[1.01] rounded-md gap-5 object-cover cursor-pointer"
            >
              <img src={imgUrl} alt="product" className="h-40 w-full" />
              <div className="p-2">
                <p>{p.productName}</p>
                <p>₹{p.productPrice}</p>
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

export default AddProduct;
