import React from "react";
import './authStyle.css'

function AuthFooter() {
  return (
    <div className="h-[67.2px] w-screen bg-white flex items-center justify-between px-6 absolute bottom-0 text-[9px] md:text-[12px] tracking-wide">
      <p className="text-gray-500">Copyright © Your Website 2020</p>

      <div className="flex text-[#077eff]">
        <p className="hover:underline cursor-pointer">Privacy Policy . </p>
        <p className="hover:underline cursor-pointer"> Terms & conditions</p>
      </div>
    </div>
  );
}

export default AuthFooter;
