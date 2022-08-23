import { Menu, Transition } from "@headlessui/react"
import { TbPaperBag, TbChevronDown } from "react-icons/tb"
import { useCartDispatch } from "../../../../context/cart"
import commerce from "../../../../lib/commerce"
import { useSession, signIn, signOut } from "next-auth/react"

import { useState } from "react"
const Dropdown = ({ product, handleClick }) => {
  const { setCart } = useCartDispatch()
  const { data: session } = useSession()

  const addToBag = () => {
    if (price === product.price.raw) {
      commerce.cart
        .add(product.id, 1, {
          [groupId]: optionId,
        })
        .then(({ cart }) => setCart(cart))
    } else {
      commerce.cart
        .add(product.id, 1, {
          [groupId]: optionId,
        })
        .then(({ cart }) => setCart(cart))
    }
    setEffect(true)
  }

  const [selected, setSelected] = useState(
    product.variant_groups[0]?.options[0].name
  )

  const [price, setPrice] = useState(0)
  const [optionId, setOptionId] = useState(
    product.variant_groups[0]?.options[0].id
  )
  const [groupId, setGroupId] = useState(product.variant_groups[0]?.id)

  const [effect, setEffect] = useState(false)
  return (
    <div className="flex justify-between pr-2 items-center mt-1.5">
      <Menu as={`div`} className="z-20">
        {({ open }) => (
          <>
            {selected && session && (
              <Menu.Button
                className={`border dark:border-slate-600 rounded-xl p-3 w-[66px] flex items-center gap-1 ml-1 justify-center z-10`}
              >
                <p className="text-base">{selected} </p>
                <span>
                  <TbChevronDown />
                </span>
              </Menu.Button>
            )}

            {/* Use the Transition component. */}
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {/* Mark this component as `static` */}
              <Menu.Items
                className={`bg-white shadow-md absolute -bottom-12 right-0 rounded-xl w-[80px] z-50`}
                static
              >
                {product.variant_groups[0]?.options.map((opt) => (
                  <Menu.Item
                    onClick={() => {
                      setSelected(opt.name)
                      setOptionId(opt.id)
                      setPrice(opt.price.raw)
                      handleClick(opt.price.raw)
                    }}
                    className={`${
                      opt.name === selected && "hidden"
                    } px-4 py-3 cursor-pointer`}
                    as={`div`}
                  >
                    <p className="dark:text-slate-600 text-sm">{opt.name}</p>
                  </Menu.Item>
                ))}
                {/* ... */}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      {session && <div className="shadow bg-white text-slate-600 h-12 w-12 rounded-full grid place-items-center absolute -right-1 -bottom-2">
        <TbPaperBag
          onClick={addToBag}
          onAnimationEnd={() => setEffect(false)}
          className={`${effect && "animate-wiggle"}`}
          size={29}
        />
      </div>}
    </div>
  )
}
export default Dropdown
