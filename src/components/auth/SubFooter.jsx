import React from "react";

function SubFooter({ message }) {
  return (
    <div className="bg-[#f7f7f7] w-full h-[45px] flex flex-col justify-center items-center text-[#077eff] text-[13px] absolute bottom-0 rounded-md">
      <p className="hover:underline cursor-pointer">{message}</p>
    </div>
  );
}

export default SubFooter;
