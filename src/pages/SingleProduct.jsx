import axios from "axios";
import React, { useEffect, useState } from "react";
import demoProImg from "../assets/demoProImg.jpg";
import productImg from "../assets/productImg.jpg";
import DeleteModal from "../components/modals/DeleteModal";
import EditModal from "../components/modals/products/EditModal";
import { useNavigate } from "react-router-dom";

function SingleProduct({ obj, selectedOption }) {
  const navigate = useNavigate();
  let local_accessToken = localStorage.getItem("accessToken");
  const [productDetails, setProductDetails] = useState({});
  const [imagePath, setImagePath] = useState("");

  const productApiCall = () => {
    axios
      .get(`http://localhost:8000/api/get-one/${obj._id}`, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setProductDetails(res.data.result);
        console.log(res.data.result);

        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(res.data.result?.image?.data))
        );
        setImagePath(base64String);
        // console.log(res.data.result);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    productApiCall();
  }, []);

  const handleDelete = () => {
    console.log("id", obj._id);

    axios
      .delete(`http://localhost:8000/api/deleteProduct/${obj._id}`, {
        headers: {
          genericvalue: "admin",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        res.status == 200
          ? setTimeout(() => {
              navigate(-1);
            }, 500)
          : "";
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        {/* <p className="text-[35px]  text-[#212529] ">Product</p> */}
        <button
          onClick={() => selectedOption("products")}
          className="bg-[#343a40] text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        {productDetails.productName
          ? productDetails.productName.toUpperCase()
          : ""}
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-start pb-10 md:h-[52vh] my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        <img
          src={imagePath ? `data:image/png;base64,${imagePath}` : productImg}
          alt="pdt"
          className="h-80 w-52 object-contain"
        />
        <div className=" w-full overflow-scroll h-full p-2">
          <div className="flex flex-col gap-6 justify-between h-full">
            {productDetails ? (
              <div className=" flex flex-col">
                <p className="text-2xl font-extrabold">
                  {productDetails.productName
                    ? productDetails.productName.toUpperCase()
                    : ""}
                </p>
                <p className="text-3xl font-thin">
                  ₹{productDetails?.productPrice}
                </p>
                {/* <p className="">Code :- {productDetails?.productCode}</p> */}

                {productDetails?.availability == "yes" ? (
                  obj.stock <= 5 ? (
                    <p className="text-sm m-4 text-red-500">
                      only {obj.stock} left
                    </p>
                  ) : (
                    <p className="text-sm m-4 text-gray-600">
                      only {obj.stock} left
                    </p>
                  )
                ) : (
                  <p className="text-red-500 m-4">OUT OF STOCK</p>
                )}

                <p className="text-justify">{productDetails?.productDetails}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <DeleteModal
          message="Are you sure, you want to delete this Product?"
          id={obj._id}
          handleDelete={handleDelete}
        />
        <EditModal obj={obj} productApiCall={productApiCall} />
      </div>
    </section>
  );
}

export default SingleProduct;
