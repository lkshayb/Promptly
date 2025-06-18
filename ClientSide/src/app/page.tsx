"use client"

import { AnimatePresence, motion } from "framer-motion";
import { div } from "framer-motion/client";
import { useState } from "react";

export default function Main() {
  const [useNext,setusenext] = useState(false);
  function Header(){
    return (
      <div className="
      bg-white/30 
      py-5 
      px-10 
      backdrop-blur 
      flex 
      justify-between">
            <div>
              <span className=" 
              text-3xl 
              font-semibold 
              bg-gradient-to-r 
              from-violet-500 
              to-blue-700 
              bg-clip-text 
              text-transparent
              ">Promptly</span>
            </div>
            <div className="
            flex 
            items-center 
            gap-14 
            text-[17px]">
              <div className="
              cursor-pointer 
              hover:scale-105 
              duration-300 
              ease-in 
              hover:text-violet-500 
              text-gray-500
              ">
                <span className="">Features</span>
              </div>
              <div className="
              cursor-pointer 
              hover:scale-105 
              duration-300 
              ease-in 
              hover:text-violet-500 
              text-gray-500
              ">
                <span className="">Creative Modes</span>
              </div>
              <div className="
              cursor-pointer 
              hover:scale-105 
              duration-300 
              ease-in 
              hover:text-violet-500 
              text-gray-500
              ">
                <span className="">Pricing</span>
              </div>
            </div>
            <div className="
            flex 
            gap-5">
              <button className="
              cursor-pointer 
              border 
              border-blue-500/20 
              hover:border-violet-500/20
              px-4 
              rounded-lg 
              text-blue-700 
              shadow-sm 
              hover:shadow-md
              hover:bg-violet-100 
              hover:text-violet-700 
              duration-300 
              ease-in">
                <span className="">SignIn</span>
              </button>

              <button className="
              rounded-lg
              px-4
              bg-gradient-to-r 
              from-violet-500 
              to-blue-700 
              text-white
              cursor-pointer
              duration-300
              hover:text-gray-200
              ease-in
              shadow
              hover:shadow-xl

              ">
                <span className=" ">Get Started</span>
              </button>
            </div>
      </div>  
    )
  }
  return <div>
    <Header/>
  </div>
  
}
