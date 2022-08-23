const Page = ({ title, children, classes }) => {
  return (
    <div className={`flex flex-col w-full ${classes}`}>
      <h2 className="mb-8">{title}</h2>
      {children}
    </div>
  )
}
export default Page
