import { useState } from "react"
import { BiMenuAltLeft } from "react-icons/bi"
import { motion, AnimatePresence } from "framer-motion"
import { VscClose } from "react-icons/vsc"
import { useCategoriesState } from "../../../context/categories"
import useOnclickOutside from "react-cool-onclickoutside"
import Link from "next/link"
import Btn from "../../common/Btn"
import { useSession, signOut } from "next-auth/react"


const variants = {
  open: { x: 0, opacity: 1 },
  closed: { opacity: 0.5, x: "-100%" },
  none: { opacity: 0, x: "-100%" },
}

const Overlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-0"></div>
)

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: categories } = useCategoriesState()
  const FlowOn = () => {
    document.body.classList.add("fixed")
  }
  const FlowOff = () => {
    document.body.classList.remove("fixed")
  }
  const ref = useOnclickOutside(() => {
    setIsOpen(false)
    FlowOff()
  })
  return (
    <div className="relative md:hidden z-30">
      <div
        id="burgerBars"
        onClick={() => {
          FlowOn()
          setIsOpen(true)
        }}
        className="-translate-y-2 cursor-pointer dark:text-white max-w-[40px]"
      >
        <BiMenuAltLeft id="burgerBars" className="dark:text-white" size={28} />
      </div>

      <motion.div
        ref={ref}
        initial="none"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        id="burger"
        className="fixed min-h-screen top-0 left-0 rounded-xl rounded-l-none bg-blue-300 dark:bg-slate-800  min-w-[60vw] z-10 max-w-[350px]"
      >
        <div className="pt-2 px-1 relative h-[77px] bg-gradient-to-r from-yellow-200 to-red-300 rounded-r-xl z-50 dark:from-slate-900 dark:to-yellow-400 dark:via-red-800">
          <VscClose
            onClick={() => {
              setIsOpen((isOpen) => !isOpen)
              FlowOff()
            }}
            id="burgerBars"
            className="absolute right-4 top-4"
            size={28}
          />
        </div>
        <div className="px-5 py-8 mt-12">
          <ul className="flex gap-1 flex-col-reverse">
            {categories &&
              categories.map((cat, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setIsOpen(false)
                    FlowOff()
                  }}
                  className="py-2 rounded px-2 text-white  font-semibold cursor-pointer"
                >
                  <Link href={`/categories/${cat.slug}`}>
                    <h2 className="text-3xl">{cat.name}</h2>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="mt-8 border-t pt-4 border-yellow-300">
            <Btn classes={`text-white`}>Settings</Btn>
            <Btn onklick={signOut} classes={`text-white`}>Sign out</Btn>
          </div>
            <span className="absolute bottom-5 right-5 leading-2 block text-white mt-3">Made in California.</span>
        </div>
      </motion.div>
      {isOpen && <Overlay />}
    </div>
  )
}
export default BurgerMenu
