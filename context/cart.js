import { createContext, useReducer, useEffect, useContext } from "react"

import commerce from "../lib/commerce"

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const SET_CART = "SET_CART"
const RESET_CART = "RESET_CART"

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload }
    case RESET_CART:
      return state
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getCart()
  }, [])

  const setCart = (payload) => dispatch({ type: SET_CART, payload })
  const resetCart = () => dispatch({ type: RESET_CART })

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve()
      setCart(cart)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <CartDispatchContext.Provider value={{ setCart, resetCart }}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCartState = () => useContext(CartStateContext)
export const useCartDispatch = () => useContext(CartDispatchContext)
