import "../styles/globals.scss"
import "@fontsource/shrikhand"
import "../styles/card.scss"
import "../styles/_cart.scss"

import Container from "../components/common/Container"
import Page from "../components/common/Page"
import Navbar from "../components/Navbar/Navbar"
import { SessionProvider } from "next-auth/react"
import { CategoriesProvider } from "../context/categories"
import { ProductsProvider } from "../context/products"
import { CartProvider } from "../context/cart"
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SessionProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
              <Navbar Container={Container} />
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <main>
                  <Component {...pageProps} Container={Container} Page={Page} />
                </main>
              </AnimatePresence>
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
