import Image from "next/image"
import { useCartDispatch, useCartState } from "../../context/cart"
import Btn from "../../components/common/Btn"
import { TbHeart } from "react-icons/tb"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useState } from "react"
import commerce from "../../lib/commerce"
import Link from "next/link"
import { useRouter } from "next/router"

function CartItem({ id, name, quantity, line_total, image }) {
  const [isFavorited, setFavorited] = useState(false)
  const { setCart } = useCartDispatch()

  const handleUpdateCart = ({ cart }) => setCart(cart)

  const removeItem = () => commerce.cart.remove(id).then(handleUpdateCart)

  const decrementQuantity = () => {
    quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then(handleUpdateCart)
      : removeItem()
  }

  const incrementQuantity = () =>
    commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart)

  return (
    <div className=" w-full grid grid-cols-[0.5fr,1fr] gap-2  items-start ">
      <div className="space-y-2 w-full">
        <h2 className="text-sm">{name}</h2>
        <h5 className="text-xl font-semibold">
          {line_total.formatted_with_symbol}
        </h5>
        <div className="flex flex-col gap-2 justify-between w-full">
          <span className="dark:text-white">Qty: {quantity}</span>
          <div className="flex justify-between">
            <div className="flex">
              <Btn
                id="bagBtns"
                classes={` dark:bg-transparent mr-2`}
                onClick={incrementQuantity}
              >
                <AiOutlinePlus size={20} />
              </Btn>
              {quantity !== 1 && (
                <Btn
                  id="bagBtns"
                  classes=" dark:bg-transparent"
                  onClick={decrementQuantity}
                >
                  <AiOutlineMinus size={20} />
                </Btn>
              )}
              {quantity === 1 && (
                <Btn onClick={removeItem} classes="ml-auto ">
                  <span className="dark:text-white font-normal ">Remove</span>
                </Btn>
              )}
              <div
                onClick={() => setFavorited((isFavorited) => !isFavorited)}
                className="cursor-pointer  h-12 w-12 rounded-full -top-1 -right-1 grid place-items-center ml-2"
              >
                <TbHeart
                  size={24}
                  className={`${isFavorited && "fill-red-300"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage({ Container, Page }) {
  const { line_items, subtotal } = useCartState()
  const { setCart } = useCartDispatch()
  const EmptyCleanCart = () => {
    commerce.cart.empty().then((res) => setCart(res.cart))
    router.reload(window.location.pathname)
  }

  const isEmpty = line_items.length === 0
  const router = useRouter()

  if (isEmpty)
    return (
      <Container>
        <Page title="Your bag is empty." />
      </Container>
    )

  return (
    <Container classes="flex-col mb-40">
      <Page title="Bag" classes="relative">
        <div className="md:flex  w-full">
          <div className="md:grid grid-cols-2">
            {line_items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>

          <div className=" cursor-pointer  grid place-items-center w-full md:flex md:flex-col md:relative py-4 rounded-t-xl px-8 absolute top-0 left-0 whitespace-nowrap">
            <div className="flex flex-col justify-end items-end w-full gap-2">
              <p className="inline-block dark:text-white">
                <strong>Subtotal:</strong>
              </p>
              <h5 className="text-xl font-semibold">
                {subtotal.formatted_with_symbol}
              </h5>
              <div
                className="absolute right-8 bottom-0 text-xs"
                onClick={EmptyCleanCart}
              >
                Empty bag
              </div>
            </div>
          </div>
          <Link href="/checkout">
            <h4 className="text-xl font-semibold cursor-pointer mt-4 whitespace-nowrap">Checkout &rarr;</h4>
          </Link>
        </div>
      </Page>
    </Container>
  )
}
