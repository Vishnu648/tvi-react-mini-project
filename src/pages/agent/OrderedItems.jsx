import axios from "axios";
import React, { useState, useEffect } from "react";
import productImg from "../../assets/productImg.jpg";
import Loading from "../../components/Loading";

function OrderedItems({ optionSetter }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const [orderedItems, setOrderedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const orderedItemsApiCall = () => {
    axios
      .get("http://localhost:8000/api/order-productlist", {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setOrderedItems(res.data.results);
        res.data.results ? setIsLoading(false) : "";
        console.log(res.data.results);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    orderedItemsApiCall();
  }, []);

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">My Orders</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Order List
      </div>
      <div className="flex flex-col gap-3 justify-center md:justify-center items-center p-5 my-8 border rounded-md border-[#e9ecef] ">
        {isLoading ? (
          <Loading />
        ) : orderedItems.length == "0 " ? (
          <div className="flex flex-col gap-2 items-center h-[50vh]">
            <h2 className="text-xl font-medium text-gray-500">
              You haven't Ordered anything yet.
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
          orderedItems.map((item, i) => {
            if (item?.product?.image.length > 0) {
              const base64String=(item?.product?.image[0]);

              var imgUrl = base64String
                ? `data:image/jpeg;base64,${base64String}`
                : productImg;
            }

            return (
              <div
                key={i}
                className="flex w-full border rounded-md hover:shadow-md px-2 py-1 gap-3 cursor-pointer"
                onClick={() => optionSetter("singleOrder", item)}
              >
                <div className="flex items-center w-[50%] gap-11">
                  <img
                    src={imgUrl ? imgUrl : productImg}
                    alt="prtd"
                    className=""
                    height={100}
                    width={100}
                  />
                  <div>
                    <h3>{item?.product?.title}</h3>
                    <div className="flex items-center">
                      <pre className="text-gray-500 text-sm">color : </pre>
                      <pre className={`text-[${item?.product?.color}]`}>
                        {item?.product?.color}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-[50%] justify-between pr-28">
                  <p>₹{item?.product?.price}</p>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full bg-orange-400`}></div>
                    <p>{item?.status}</p>
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

export default OrderedItems;
