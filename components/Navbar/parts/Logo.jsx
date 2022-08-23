import Link from "next/link"

const Logo = () => {
  return (
    <div className="max-w-min [600px]:absolute md:left-5 md:bottom-24 lg:static xl:bottom-0  sm:scale-100 transition-all duration-200 z-30 cursor-pointer">
      <Link href="/">
        <h1 className="font-bold w-1/2 leading-5 text-3xl">The Canna Corner</h1>
      </Link>
      <span className="block">DRUG STORE&reg;</span>
    </div>
  )
}
export default Logo
