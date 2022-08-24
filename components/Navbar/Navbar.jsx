import Logo from "./parts/Logo"
import Searchbar from "./parts/Searchbar"
import Icons from "./parts/Icons/Icons"
import DeliveryPickup from "./parts/DeliveryPickup"
import BurgerMenu from "./parts/BurgerMenu"
import { useCategoriesState } from "../../context/categories"
import QuickNav from "./parts/QuickNav"
import { useSession, signIn } from "next-auth/react"
import Btn from "../common/Btn"
import { FcGoogle } from "react-icons/fc"

const Navbar = ({ Container }) => {
  const { data: session } = useSession()
  const { data: categories } = useCategoriesState()
  return (
    <header className=" dark:bg-surface dark:text-white">
      <Container noMotion classes="flex-col lg:gap-0 relative">
        <div className="flex justify-between w-full">
          <div className="flex justify-center  flex-col w-full md:flex-row Search:gap-4 Search:items-center md:justify-start md:gap-1">
            <BurgerMenu categories={categories} />
            <div className="hidden Search:block flex-1 order-2 lg:mr-3 lg:ml-1">
              <Searchbar />
            </div>
            <Logo />
          </div>

          {session && (
            <div className="flex flex-col items-center justify-center gap-4 Icons:flex-row  pb-2">
              <Icons />
              <DeliveryPickup />
            </div>
          )}

          {!session && (
            <div className="md:translate-y-5 md:ml-3">
              <Btn onklick={signIn} classes="relative grid  w-[129px]">
                <FcGoogle
                  className=" absolute left-5 top-1/2 -translate-y-1/2"
                  size={30}
                />
                <h5 className="block text-sm  translate-x-4">Sign in</h5>
              </Btn>
            </div>
          )}
        </div>
        <div className="Search:hidden w-full mt-4">
          <Searchbar />
        </div>
        <div className="flex items-center justify-between w-full"></div>
        <QuickNav categories={categories} />
      </Container>
    </header>
  )
}
export default Navbar
