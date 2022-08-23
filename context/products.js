import { createContext, useReducer, useEffect, useContext } from "react"
import commerce from "../lib/commerce"

const ProductsContext = createContext()

const SET_PRODUCTS = "SET_PRODUCTS"

const initialState = {}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, ...action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getProducts()
  }, [])

  const setProducts = (payload) => dispatch({ type: SET_PRODUCTS, payload })

  const getProducts = async () => {
    try {
      const products = await commerce.products.list()
      setProducts(products)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsState = () => useContext(ProductsContext)
