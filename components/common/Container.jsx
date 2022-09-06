import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 30, x: 0 },
  enter: { opacity: 1, y: 0, x: 0 },
  exit: { opacity: 0, y: 0, x: -100 },
}
const Container = ({ children, classes, noMotion }) => {
  if (noMotion) {
    return (
      <div
        className={`${classes} max-w-5xl mx-auto flex items-center justify-between p-5`}
      >
        {children}
      </div>
    )
  }
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
      className={`${classes} max-w-5xl mx-auto flex items-center justify-between p-5`}
    >
      {children}
    </motion.div>
  )
}
export default Container
