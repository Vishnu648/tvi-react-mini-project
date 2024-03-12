import React, { useState } from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import showToastMessage from "../components/ToastMessager";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  let local_otpToken = localStorage.getItem("otpAccessToken");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleCreatePassword = (e) => {
    e.preventDefault();
    if (password && confirmPassword) {
      if (password == confirmPassword) {
        const details = {
          password: password,
          confirmPassword: confirmPassword,
        };
        axios
          .post("http://localhost:8000/api/me/changepassword", details, {
            headers: {
              Authorization: local_otpToken,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              showToastMessage("Password changed successfully");
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            }
          })
          .catch((err) => console.log(err.message));
      }
    }
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
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[441px] h-[432px] relative bg-white rounded-md">
        <AuthHeading heading={"Create Password"} />
        <form className="h-[312px] p-5 flex flex-col gap-6 ">
          <label id="Label">
            New Password
            <br />{" "}
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Enter new password"
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="Confirm password"
            />
            {passwordMatch ? null : (
              <p style={{ color: "red" }}>Password do not match</p>
            )}
          </label>

          <div className="flex w-full items-center justify-between">
            <p className="hover:underline cursor-pointer text-[13px] text-[#007bff]"></p>
            <button
              onClick={handleCreatePassword}
              className="bg-[#007bff] hover:bg-[#0062cc] py-[6px] px-4 rounded-[3px] text-white"
            >
              Create
            </button>
          </div>
        </form>
        <Link to="/login">
          <SubFooter message={"Need an account? Sign up!"} />
        </Link>
      </section>
      <AuthFooter />
      <ToastContainer />
    </div>
  );
}

export default Login;
