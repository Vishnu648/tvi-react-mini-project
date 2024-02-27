import React, { useState } from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[441px] h-[462px] relative bg-white rounded-md">
        <AuthHeading heading={"Login"} />
        <form className="h-[312px] p-5 flex flex-col gap-6 ">
          <label id="Label">
            Email
            <br />{" "}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </label>

          <label id="Label">
            Password
            <br />{" "}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </label>
          <label className="flex gap-2 text-[#2a2e32] text-sm">
            <input type="checkbox" />
            Remember Password
          </label>
          <div className="flex w-full items-center justify-between">
            <Link to="/recover-password">
              <p className="hover:underline cursor-pointer text-[13px] text-[#007bff]">
                Forgot Password?
              </p>
            </Link>
            <button
              onClick={handleLogin}
              className="bg-[#007bff] hover:bg-[#0062cc] py-[6px] px-4 rounded-[3px] text-white"
            >
              Login
            </button>
          </div>
        </form>
        <Link to="/">
          <SubFooter message={"Need an account? Sign up!"} />
        </Link>
      </section>
      <AuthFooter />
    </div>
  );
}

export default Login;
