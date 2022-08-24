import Btn from "../../common/Btn"
import { TbSearch } from "react-icons/tb"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
  none: {opacity: 0}
}

const Searchbar = () => {
  const [focused, setFocused] = useState(false)
  return (
    <div className=" relative w-full sm:max-w-[340px] mx-auto flex-1 md:-translate-x-4  Search:mr-0 overflow-x-hidden">
      <div className="overflow-hidden w-full z-0 rounded-full relative p-2.5 bg-green-300">
        <div className="relative z-50 dark:bg-surface rounded-full w-full md:flex">
          <input
            maximum-scale={1}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            type="text"
            placeholder="Search strains, moods, devices..."
            className="rounded-full px-4 w-full bg-white text-gray-700 focus:outline-none py-1.5 text-[15px] dark:text-white dark:bg-surface  md:flex-1"
          />
          <Btn classes="active grid place-items-center ml-auto absolute shadow -right-1 -top-0.5 px-4 md:px-6">
            <TbSearch size={24} />
          </Btn>
        </div>
          <motion.div initial="none" animate={focused ? "open" : "closed"} variants={variants}>
            <div
              className={`glow animate-glow1  glow-1 z-10 bg-green-400 rounded-100 w-120 h-120 -top-10 -left-10 absolute`}
            ></div>
            <div
              className={`glow-2 z-20 bg-green-500 rounded-100 w-120 h-120 -top-10 -left-10 absolute`}
            ></div>
            <div
              className={`animate-glow3 glow
              } glow-3 z-30  bg-green-300 rounded-100 w-120 h-120 -top-10 -left-10 absolute`}
            ></div>
            <div
              className={`animate-glow4 glow
              }  glow-4 z-40  bg-indigo-400 rounded-100 w-120 h-120 -top-10 -left-10 absolute`}
            ></div>
          </motion.div>
      </div>
    </div>
  )
}
export default Searchbar
