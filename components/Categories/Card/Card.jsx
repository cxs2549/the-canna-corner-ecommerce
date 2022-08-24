import Image from "next/image"
import { TbHeart } from "react-icons/tb"
import Dropdown from "./parts/Dropdown"
import { useState } from "react"
import Ratings from "./parts/Ratings"
import { useSession } from "next-auth/react"

const Card = ({ product }) => {
  const { data: session } = useSession()

  const [isFavorited, setIsFavorited] = useState(false)
  const price = product.price.raw
  const [addedPrice, setAddedPrice] = useState(product.price?.raw)
  const handleClick = (newPrice) => setAddedPrice(price + newPrice)
  return (
    <div className="relative flex-1 flex flex-col   border dark:border-slate-600 rounded-xl">
      <div className="rounded-t-xl bg-white overflow-hidden  w-full flex justify-center">
        <Image
          height={222}
          width={222}
          // layout="fixed"
          src={product.image.url}
          className="rounded-t-xl"
        />
      </div>
      <div className="pb-1  flex flex-col justify-between">
        <div className="p-1 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="block">{product.categories[1]?.name}</span>
            <h2 className="pr-2 text-base -translate-y-0.5">{product.name}</h2>
            <h2 className="text-xl font-semibold mt-1.5">${addedPrice}.00</h2>
          </div>
          <Ratings reviews={product.created.toString().slice(-2)} />
        </div>

        <Dropdown product={product} handleClick={handleClick} />
      </div>
      {session && (
        <div
          onClick={() => setIsFavorited((isFavorited) => !isFavorited)}
          className="cursor-pointer absolute h-12 w-12 bg-white dark:text-slate-600 shadow rounded-full -top-1 -right-1 grid place-items-center"
        >
          <TbHeart size={28} className={`${isFavorited && "fill-red-300"}`} />
        </div>
      )}
    </div>
  )
}
export default Card
