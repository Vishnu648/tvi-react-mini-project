import React from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { Link } from "react-router-dom";

function Login() {
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
            <br /> <input type="email" placeholder="Enter email address" />
          </label>
          <div className="flex w-full mt-6 items-center justify-between">
            <Link to="/login">
              <p className="hover:underline cursor-pointer text-[13px] text-[#007bff]">
                Return to login
              </p>
            </Link>
            <button className="bg-[#007bff] hover:bg-[#0062cc] py-[6px] px-4 rounded-[3px] text-white">
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
