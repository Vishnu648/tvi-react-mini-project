import React from "react";
// import "./style.css";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [imgPath, setImgPath] = useState("");
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    // console.log(e.target.value);
    setImage(e.target.value);
  };

  let local_accessToken = localStorage.getItem("accessToken");

  function handleApi() {
    const formData = new FormData();
    formData.append("iamge", image);
    axios
      .post("http://localhost:8000/image/import", formData, {
        headers: {
          genericvalue: "agent",
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        setImgPath(res);
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className="h-8 border border-red-800">
      <input type="file" name="file" onChange={handleImage} />

      <button className="px-2 py-1 bg-slate-600" onClick={handleApi}>
        Submit
      </button>
    </div>
  );
}
