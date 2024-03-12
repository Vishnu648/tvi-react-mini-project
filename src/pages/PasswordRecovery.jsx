import React, { useState } from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const navigate = useNavigate();

  const handleGenerateOtp = () => {
    const recoveryPassword = {
      email: email,
    };
    if (email) {
      axios
        .post("http://localhost:8000/api/me/forgotpassword", recoveryPassword)
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("recoveryEmail", email);
            navigate("/otp");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  const hanldeEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setEmailValid(validateEmail(inputEmail));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  return (
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[441px] h-[392px] relative bg-white rounded-md">
        <AuthHeading heading={"Password Recovery"} />
        <section className="p-5 text-[#6f7880] text-[13px]">
          <p className="mb-5">
            Enter your email address and we will send you a OTP to reset your
            password.
          </p>
          <label id="Label">
            Email
            <br />{" "}
            <input
              value={email}
              onChange={hanldeEmailChange}
              type="email"
              placeholder="Enter email address"
            />
             {emailValid ? null : (
              <p style={{ color: "red" }}>Invalid email format</p>
            )}
          </label>
          <div className="flex w-full mt-6 items-center justify-between">
            <Link to="/login">
              <p className="hover:underline cursor-pointer text-[13px] text-[#007bff]">
                Return to login
              </p>
            </Link>
            <button
              onClick={handleGenerateOtp}
              className="bg-[#007bff] hover:bg-[#0062cc] py-[6px] px-4 rounded-[3px] text-white"
            >
              Generate OTP
            </button>
          </div>
        </section>
        <Link to="/">
          <SubFooter message={"Need an account? Sign up!"} />
        </Link>
      </section>
      <AuthFooter />
    </div>
  );
}

export default Login;
