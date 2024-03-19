import React from 'react'

function SingleProduct() {
  return (
    <section className="px-6 flex-1 overflow-scroll h-[92vh] pb-5">
       <div className=" mb-[.5rem] mt-[1.5rem] leading-[1.2] flex justify-between  ">
        <p className="text-[35px]  text-[#212529] ">Product</p>

      </div>
      <div className="bg-[#e9ecef]  h-12 flex items-center text-[#838b92] px-4 rounded-sm text-[1rem] mb-2">
        Product 
      </div>
    </section>
  )
}

export default SingleProduct