import React, { useState } from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[630px] h-[680px] md:h-[530px] relative bg-white rounded-md">
        <AuthHeading heading={"Create Account"} />
        <form className=" p-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label id="Label">
              First Name
              <br />{" "}
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter first name"
              />
            </label>
            <label id="Label">
              Last Name
              <br />{" "}
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter last name"
              />
            </label>
          </div>

          <label id="Label">
            Email
            <br />{" "}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label id="Label">
              Password
              <br />{" "}
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </label>
            <label id="Label">
              Confirm Password
              <br />{" "}
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </label>
          </div>
          <button
            onClick={handleCreate}
            className="bg-[#007bff] hover:bg-[#0062cc] my-4 py-[6px] px-4 rounded-[3px] text-white"
          >
            Create Account
          </button>
        </form>
        <Link to="/login">
          <SubFooter message={"Have an account? Go to login"} />
        </Link>
      </section>
      <AuthFooter />
    </div>
  );
}

export default Register;
