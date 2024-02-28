import React, { useState } from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const tokens = useSelector((state) => state.token);

  const handleCreate = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    };

    console.log(tokens)

    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0 &&
      confirmPassword > 0
    ) {
      if (password == confirmPassword) {
        // axios("https://jsonplaceholder.typicode.com/posts", {
        //   method: "POST",
        //   body: JSON.stringify({
        //    newUser
        //   }),
        //   headers: {
        //     "Content-type": "application/json;",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((json) => console.log(json));
      }
    }
  };

  return (
    <div className="bg-[#007bff] w-screen md:h-screen h-[900px] flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[630px] h-[720px] md:h-[530px] relative bg-white rounded-md">
        <AuthHeading heading={"Create Account"} />
        <form className=" p-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label id="Label">
              First Name
              <br />{" "}
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                value={firstName}
                placeholder="Enter first name"
              />
            </label>
            <label id="Label">
              Last Name
              <br />{" "}
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                value={lastName}
                placeholder="Enter last name"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <label id="Label">
              Email
              <br />{" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </label>

            <label htmlFor="role" className="flex gap-2">
              Role:
              <select
                name="role"
                id="role"
                onClick={(e) => setRole(e.target.value)}
              >
                <option value="qa">QA</option>
                <option value="qc">Qc</option>
                <option value="agent">Agent</option>
                <option value="supervisor">supervisor</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label id="Label">
              Password
              <br />{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </label>
            <label id="Label">
              Confirm Password
              <br />{" "}
              <input
                type="password"
                value={confirmPassword}
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
