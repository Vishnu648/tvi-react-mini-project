import React, { useState } from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";
import SubFooter from "../components/auth/SubFooter";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [otpValid, setOtpValid] = useState(true);
  let local_recoveryEmail = localStorage.getItem("recoveryEmail");

  const handleOtpVerification = () => {
    const verifyOtp = {
      otp: otp,
      email: local_recoveryEmail,
    };
    if (otp) {
      axios
        .post("http://localhost:8000/api/me/verifyotp", verifyOtp)
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("otpAccessToken", res.data.accessToken);
            navigate("/create-password");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleOtpChange = (e) => {
    const inputOtp = e.target.value;
    setOtp(inputOtp);
    if (inputOtp.length < 6) {
      setOtpValid(false);
    } else {
      setOtpValid(true);
    }
  };

  return (
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[441px] h-[382px] relative bg-white rounded-md">
        <AuthHeading heading={"Verify OTP"} />
        <section className="p-5 text-[#6f7880] text-[13px]">
          <p className="mb-5">Please enter the otp sent to your email ID</p>
          <label id="Label">
            OTP
            <br />{" "}
            <input
              value={otp}
              onChange={handleOtpChange}
              type="email"
              placeholder="0A98XY"
            />
            {otpValid ? null : (
              <p style={{ color: "red" }}>OTP has 6 characters</p>
            )}
          </label>
          <div className="flex w-full mt-6 items-center justify-between">
            <p className="hover:underline cursor-pointer text-[13px] text-[#007bff]"></p>
            <button
              onClick={handleOtpVerification}
              className="bg-[#007bff] hover:bg-[#0062cc] py-[6px] px-4 rounded-[3px] text-white"
            >
              Verify
            </button>
          </div>
        </section>
        <SubFooter message={"Need an account? Sign up!"} />
      </section>
      <AuthFooter />
    </div>
  );
}

export default Login;
