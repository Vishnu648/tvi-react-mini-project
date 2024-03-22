import React from "react";

function WishList() {
  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
      <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">WishList</p>
      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        WishList
      </div>

      <div className="h-[53vh]  flex flex-wrap lg:flex-row gap-3 justify-center md:justify-between items-center p-5 my-8 overflow-scroll border rounded-md border-[#e9ecef] ">
        
      </div>
    </section>
  );
}

export default WishList;
