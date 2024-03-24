import React, { useEffect } from "react";
import Router from "./Router/Router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  set_Access_Tokken,
  set_Refresh_Token,
} from "./Redux//features/tokenSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.token);
  const local_refreshToken = localStorage.getItem("refreshToken");
  const local_accessToken = localStorage.getItem("accessToken");

  const accessTokenApiCall = () => {
    const details = {
      refreshToken: local_refreshToken,
    };

    axios
      .post("http://localhost:8000/api/refresh-token", details)
      .then((res) => localStorage.setItem("accessToken", res.data.access_token))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    // setInterval(() => {
    //   accessTokenApiCall();
    // }, 10000);
  }, []);

  return <Router />;
}

export default App;
