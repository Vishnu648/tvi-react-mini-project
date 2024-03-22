import React, { useState } from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import showToastMessage from "../components/ToastMessager";

function AdminRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("agent");
  const tokens = useSelector((state) => state.token);
  let local_accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [firstValidatoin, setFirstValidatoin] = useState(true);
  const [lastValidatoin, setLastValidatoin] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleCreate = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    };

    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      if (password == confirmPassword) {
        axios
          .post("http://localhost:8000/api/user", newUser, {
            headers: {
              genericvalue: "admin",
              Authorization: tokens.access_token || local_accessToken,
            },
          })
          .then((response) => {
            let responseObj = JSON.parse(response.config.data);
            // console.log(response);
            if (response.status === 201) {
              navigate("/home");
            }
          })
          .catch((err) => {
            if (err.response.status == 409) {
              showToastMessage("Email already in use!!!");
            } else {
              console.log(err.message);
            }
          });
      }
    }
  };

  const handleFirstNameChange = (e) => {
    const inputFirstName = e.target.value;
    setFirstName(inputFirstName);
    if (inputFirstName.length < 2) {
      setFirstValidatoin(false);
    } else {
      setFirstValidatoin(true);
    }
  };

  const handleSecondNameChange = (e) => {
    const inputSecondName = e.target.value;
    setLastName(inputSecondName);
    if (inputSecondName.length < 2) {
      setLastValidatoin(false);
    } else {
      setLastValidatoin(true);
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setEmailValid(validateEmail(inputEmail));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    if (inputPassword.length < 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (password != inputConfirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
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
                onChange={handleFirstNameChange}
                type="text"
                value={firstName}
                placeholder="Enter first name"
              />
              {firstValidatoin ? null : (
                <p style={{ color: "red" }}>FirstName too short </p>
              )}
            </label>
            <label id="Label">
              Last Name
              <br />{" "}
              <input
                onChange={handleSecondNameChange}
                type="text"
                value={lastName}
                placeholder="Enter last name"
              />
              {lastValidatoin ? null : (
                <p style={{ color: "red" }}>LastName too short </p>
              )}
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-center">
            <label id="Label">
              Email
              <br />{" "}
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email address"
              />
              {emailValid ? null : (
                <p style={{ color: "red" }}>Invalid email format</p>
              )}
            </label>

            <label htmlFor="role" className="flex gap-2">
              Role:
              <select
                name="role"
                id="role"
                onClick={(e) => setRole(e.target.value)}
              >
                <option value="agent">Agent</option>
                <option value="qa">QA</option>
                <option value="qc">Qc</option>
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
                onChange={handlePasswordChange}
                placeholder="Enter password"
              />
              {passwordValid ? null : (
                <p style={{ color: "red" }}>
                  Password must be at least 8 characters
                </p>
              )}
            </label>
            <label id="Label">
              Confirm Password
              <br />{" "}
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm password"
              />
              {passwordMatch ? null : (
                <p style={{ color: "red" }}>Password do not match</p>
              )}
            </label>
          </div>
          <button
            onClick={handleCreate}
            className="bg-[#007bff] hover:bg-[#0062cc] my-4 py-[6px] px-4 rounded-[3px] text-white"
          >
            Create Account
          </button>
        </form>
        <Link to="/home">
          <SubFooter message={"Back to Dashboard"} />
        </Link>
      </section>
      <AuthFooter />
      <ToastContainer />
    </div>
  );
}

export default AdminRegister;
