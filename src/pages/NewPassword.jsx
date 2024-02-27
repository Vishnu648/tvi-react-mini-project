import React from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";

function Login() {
  return (
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[441px] h-[432px] relative bg-white rounded-md">
        <AuthHeading heading={"Create Password"} />
        <form className="h-[312px] p-5 flex flex-col gap-6 ">
          <label id="Label">
            New Password
            <br /> <input type="email" placeholder="Enter new password" />
          </label>

          <label id="Label">
            Confirm Password
            <br /> <input type="password" placeholder="Confirm password" />
          </label>
          
          <div className="flex w-full items-center justify-between">
            <p className="hover:underline cursor-pointer text-[13px] text-[#007bff]">
            
            </p>
            <button className="bg-[#007bff] hover:bg-[#0062cc] py-[6px] px-4 rounded-[3px] text-white">
              Create
            </button>
          </div>
        </form>
        <SubFooter message={"Need an account? Sign up!"} />
      </section>
      <AuthFooter />
    </div>
  );
}

export default Login;
