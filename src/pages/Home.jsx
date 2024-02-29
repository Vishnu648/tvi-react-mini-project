import React from 'react'
import Navbar from '../components/Navbar'
import { AiTwotoneDashboard } from "react-icons/ai";

function Home() {
  return (
    <div>
        <Navbar/>
        <section className='flex'>
          <nav className='bg-[#212529] w-[225px] h-screen'>
            <div className='w-full h-[58px] px-4 pt-7 pb-3 text-[#585b5e] font-medium text-[13px]'>CORE</div>
            <div className='w-full flex items-center gap-2 h-[48px] px-4 py-3 text-[#686b6d] text-[1rem] font-normal '>
            <AiTwotoneDashboard />
            Dashboard</div>
          </nav>
          <section></section>
        </section>
    </div>
  )
}

export default Home