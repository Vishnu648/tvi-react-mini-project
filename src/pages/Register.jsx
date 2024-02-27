import React from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";

function Register() {
  return (
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[80%] xl:w-[630px] h-[530px] relative bg-white rounded-md">
        <AuthHeading heading={"Create Account"} />
        <form className=" p-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label id="Label">
              First Name
              <br /> <input type="text" placeholder="Enter first name" />
            </label>
            <label id="Label">
              Last Name
              <br /> <input type="text" placeholder="Enter last name" />
            </label>
          </div>

          <label id="Label">
            Email
            <br /> <input type="email" placeholder="Enter email address" />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label id="Label">
              Password
              <br /> <input type="password" placeholder="Enter password" />
            </label>
            <label id="Label">
              Confirm Password
              <br /> <input type="password" placeholder="Confirm password" />
            </label>
          </div>
          <button className="bg-[#007bff] my-4 py-[6px] px-4 rounded-[3px] text-white">
            Create Account
          </button>
        </form>
        <SubFooter message={"Have an account? Go to login"} />
      </section>
      <AuthFooter />
    </div>
  );
}

export default Register;
