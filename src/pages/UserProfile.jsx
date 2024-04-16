import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { set_Access_Tokken } from "../Redux/features/tokenSlice";
import { useNavigate } from "react-router-dom";
import Profile from "./agent/Profile";
import Store from "./agent/Store";
import Product from "../pages/agent/Product";
import Cart from "./agent/Cart";
import WishList from "./agent/WishList";
import Order from "./agent/Order";
import OrderedItems from "./agent/OrderedItems";
import SingleOrderedItem from "./agent/SingleOrderedItem";

function UserProfile() {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedOption, setSelectedOption] = useState("profile");
  const fullName = `${userData.firstName} ${userData.lastName}`;

  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");
  let local_refreshToken = localStorage.getItem("refreshToken");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  let local_role = localStorage.getItem("role");
  const [selectedPage, setSelectedPage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const optionSetter = (opt, obj, page, productQuantity) => {
    // console.log(obj);
    setSelectedOption(opt);
    setSelectedProduct(obj);
    setSelectedPage(page);
    setQuantity(productQuantity);
  };

  const userApiCall = () => {
    axios
      .get("http://localhost:8000/api/me", {
        headers: {
          genericvalue: "agent",
          Authorization: tokens.access_token || local_accessToken,
        },
      })
      .then((response) => {
        setuserData(response.data.result);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const toogleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (local_role != "agent") {
      navigate(-1);
    }
    userApiCall();
    setInterval(() => {
      axios
        .post("http://localhost:8000/api/refresh-token", local_refreshToken)
        .then((res) => dispatch(set_Access_Tokken(res.data.refresh_token)))
        .catch((err) => err.message);
    }, 3600000);
  }, []);

  let words = fullName.split(" ");

  let dp = words
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <UserNavbar toogleSidebar={toogleSidebar} optionSetter={optionSetter} />
      <div className="flex ">
        <div
          className={`transition-all duration-500 ${
            sidebarIsOpen ? "w-[225px]" : "w-0"
          } overflow-hidden`}
        >
          <UserSidebar optionSetter={optionSetter} fullName={fullName} />
        </div>

        {selectedOption == "profile" ? (
          <Profile />
        ) : selectedOption == "store" ? (
          <Store optionSetter={optionSetter} />
        ) : selectedOption == "product" ? (
          <Product
            optionSetter={optionSetter}
            obj={selectedProduct}
            selectedPage={selectedPage}
          />
        ) : selectedOption == "cart" ? (
          <Cart optionSetter={optionSetter} />
        ) : selectedOption == "wishlist" ? (
          <WishList optionSetter={optionSetter} />
        ) : selectedOption == "order" ? (
          <Order
            optionSetter={optionSetter}
            obj={selectedProduct}
            selectedPage={selectedPage}
            productQuantity={quantity}
          />
        ) : selectedOption == "orderedItems" ? (
          <OrderedItems optionSetter={optionSetter} />
        ) : selectedOption == "singleOrder" ? (
          <SingleOrderedItem 
            obj={selectedProduct}
            optionSetter={optionSetter}
          />
        ) : (
          console.log("undefined-------")
        )}
      </div>
    </div>
  );
}

export default UserProfile;
