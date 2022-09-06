import Icon from "./parts/Icon"
import { TbUser, TbPaperBag, TbHeart } from "react-icons/tb"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCartState } from "../../../../context/cart"

const Icons = () => {
  const router = useRouter()
  const state = useCartState()
  return (
    <div className="flex self-end Icons:self-center w-full justify-end max-w-min  Icons:mr-0">
      <Link href="/account/bag">
        <div className="relative flex items-center">
          <div className="bg-slate-200 dark:bg-slate-600 rounded px-2 py-1 flex items-center justify-center ">
          <h5 className="font-semibold text-xs">{state.subtotal?.formatted_with_symbol}</h5>
          </div>
          <Icon shape={<TbPaperBag />} />
          <div className="absolute bg-green-600 rounded-full h-4 text-white w-4 grid place-items-center top-0 right-2">
            <span className="font-semibold">{state.total_items}</span>
          </div>
        </div>
      </Link>
      <Link href={`/account/favorites`}>
        <div>
          <Icon
            shape={
              <TbHeart
                className={`${
                  router.pathname === "/account/favorites" && "fill-red-300"
                }`}
              />
            }
          />
        </div>
      </Link>
      <Link href={`/account/profile`}>
        <div>
          <Icon shape={<TbUser />} />
        </div>
      </Link>
      {/* <pre>
        {JSON.stringify(state.subtotal, null, 2)}
      </pre> */}
    </div>
  )
}
export default Icons
