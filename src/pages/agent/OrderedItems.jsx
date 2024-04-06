import axios from "axios";
import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";

function OrderedItems() {
  let local_accessToken = localStorage.getItem("accessToken");
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/order-productlist", {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => setOrderedItems(res.data.results))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">My Orders</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Order List
      </div>
      <div className="h-[59vh] flex flex-col gap-3 justify-center md:justify-center items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        {orderedItems.map((item) => {
          return (
            <div
              key={item._id}
              className="flex w-full border rounded-md hover:shadow-md px-2 py-1 gap-3 cursor-pointer"
            >
              <div className="flex items-center w-[50%] gap-11">
                <img
                  src={productImg}
                  alt="prtd"
                  className=""
                  height={100}
                  width={100}
                />
                <div>
                  <h3>{"item.title"}</h3>
                  <div className="flex items-center">
                    <pre className="text-gray-500 text-sm">color : </pre>
                    <pre className={`text-[${item.color}]`}>{"item.color"}</pre>
                  </div>
                </div>
              </div>

              <div className="flex items-center w-[50%] justify-between pr-28">
                <p>₹{"items.price"}</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                  <p>{"item.status"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OrderedItems;
/*
​color: "red"
​description: "i phoneee"
​discountedPrice: 122500
​image: Array []
​offer: 2
​price: 125000
​stock: 55
​title: "i phone 15"
status: "pending"
 */
