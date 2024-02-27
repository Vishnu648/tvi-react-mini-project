import React from "react";
import AuthFooter from "../components/auth/AuthFooter";
import AuthHeading from "../components/auth/AuthHeading";

function Login() {
  return (
    <div className="bg-[#007bff] w-screen h-screen flex flex-col relative items-center pt-12">
      <section className="w-[85%] md:w-[70%] xl:w-[441px] h-[462px] bg-white rounded-md">
        <AuthHeading heading={'Login'}/>
      </section>
      <AuthFooter />
    </div>
  );
}

export default Login;
