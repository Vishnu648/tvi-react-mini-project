import axios from "axios";
import React, { useState, useEffect } from "react";
import productImg from "../assets/productImg.jpg";
import AddProducts from '../components/modals/AddProducts'

function AddProduct() {
  let local_accessToken = localStorage.getItem("accessToken");
  const [products, setProducts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getProdt", {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log("error-", err.message));
  }, []);

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh]">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Products</p>
        <AddProducts/>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Products
      </div>
      <div className="flex flex-wrap lg:flex-row gap-3 justify-between items-center p-5 my-8 overflow-scroll border rounded-md">
        {products.map((p) => (
          <div className="border rounded-md gap-5 cursor-pointer">
            <img src={productImg} alt="product" className="h-40 w-full" />
            <div className="p-1">
              <p>{p.productName}</p>
              <p>${p.productPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AddProduct;