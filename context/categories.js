import { createContext, useReducer, useEffect, useContext } from "react"
import commerce from "../lib/commerce"

const CategoriesContext = createContext()

const SET_CATEGORIES = "SET_CATEGORIES"

const initialState = {}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {...state, ...action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getCategories()
  }, [])

  const setCategories = (payload) => dispatch({ type: SET_CATEGORIES, payload })

  const getCategories = async () => {
    try {
      const categories = await commerce.categories.list()
      setCategories(categories)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <CategoriesContext.Provider value={state}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategoriesState = () => useContext(CategoriesContext)
