const Btn = ({ classes, children, ...props }) => {
  return (
    <button
      {...props}
      className={`${classes} rounded-full font-semibold px-4 py-1.5 transition-colors  duration-500 ease-in-out focus:outline-none flex items-center justify-center whitespace-nowrap`}
    >
      <span className="iPhone:text-base text-sm">{children}</span>
    </button>
  )
}
export default Btn
