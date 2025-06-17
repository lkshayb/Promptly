"use client"

import { AnimatePresence, motion } from "framer-motion";
import { div } from "framer-motion/client";
import { useState } from "react";

export default function Home() {
  const [useNext,setusenext] = useState(false);
  return <main >        
    <AnimatePresence>

    {!useNext && (
      
          <motion.section initial={{y:0,opacity:1}} exit={{y:'-100%',opacity:0.1}} transition={{duration:0.4}} className="h-screen w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-2xl">
              <motion.p className="text-5xl font-bold mb-4" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                Welcome to PromptSmith
              </motion.p>

              <motion.p className="text-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                Turn your ideas into images, code, and videos — all from one prompt. Effortless, powerful, creative.
              </motion.p>

              <motion.button onClick={() => setusenext(true)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-lg">
                Get Started
              </motion.button>
            </motion.div>
          </motion.section>
        
      
      
      
    )}
    </AnimatePresence>
    {useNext && (
      <div className="text-center max-w-2xl">
        <p className="text-5xl font-bold mb-4">Welcome to PromptSmith</p>
  
      </div>
    )}
      
    </main>
  
}
