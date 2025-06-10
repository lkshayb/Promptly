"use client"

import axios from "axios";

export default function Home() {
  function HandlePrompt(){
    const payload ={
      
    }

    axios.get("https://localhost:8080").then((res) => {
      
    })
  }
  return (
    <div className="flex relative justify-center">
      <div className="flex justify-center relative">
        <input type="text" placeholder="Your Prompt Goes here" className="bg-slate-500 w-100 rounded-l-2xl p-2" />
      </div>
      <div>
        <button onClick={HandlePrompt} className="bg-white w-50 rounded-r-2xl p-2 hover:bg-black hover:text-white duration-300 ease-in">
          Go
        </button>
      </div>
    </div>
  );
}
