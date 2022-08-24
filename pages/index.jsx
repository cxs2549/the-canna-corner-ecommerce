import Link from "next/link"
import { CategoriesProvider } from "../context/categories"
import commerce from "../lib/commerce"
import { signOut, useSession } from "next-auth/react"

export async function getStaticProps() {
  const { data: categories } = await commerce.categories.list()
  const { data: products } = await commerce.products.list()
  return {
    props: {
      categories,
      products,
    },
  }
}

const Homepage = ({ Container, Page, categories }) => {
  const { data: session } = useSession()
  return (
    <Container classes="relative">
      <Page title="Shop">
        {session && session.user.name ? (
          <div className="absolute right-5">
            Hey, {session && session.user?.name.split(" ")[0]}{" "}
            <span className="cursor-pointer" onClick={() => signOut()}>
              (Sign out)
            </span>
          </div>
        ) : (
          <h2></h2>
        )}
        {/* <ul className="ml-8 flex flex-col-reverse gap-2">
          {categories.map((cat) => (
            <li className="cursor-pointer">
              <Link href={`/categories/${cat.slug}`}>{cat.name}</Link>
            </li>
          ))}
        </ul> */}
        <Example />
      </Page>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Container>
  )
}
export default Homepage

function Example() {
  return (
    <div className="bg-white dark:bg-indigo-600 md:grid grid-cols-2  shadow overflow-hidden sm:rounded-lg rounded-xl">
      <Link href={`/categories/flower`}>
        <div
          id="flowerHero"
          className="relative z-10 px-4 py-5 sm:px-6 cursor-pointer"
        >
          <h2 className=" leading-6 font-medium text-gray-600 dark:text-white">
            Flower
          </h2>
          <div className="flex gap-2">
            <p className="mt-1 max-w-2xl text-sm ">Sativa</p>
            <p className="mt-1 max-w-2xl text-sm ">Indica</p>
            <p className="mt-1 max-w-2xl text-sm ">Hybrid</p>
            <p className="mt-1 max-w-2xl text-sm ">CBD</p>
          </div>
        </div>
      </Link>
      <div>
        <dl>
          <Link href={`/categories/concentrates`}>
            <div className="cursor-pointer flex flex-col bg-gray-50 dark:bg-surface2 dark:text-white px-4 py-5 sm:px-6">
              <h2 className=" font-medium text-gray-600 dark:text-white">
                Concentrates
              </h2>
              <div className="flex gap-2">
                <p className="mt-1 max-w-2xl text-sm ">Sativa</p>
                <p className="mt-1 max-w-2xl text-sm ">Indica</p>
                <p className="mt-1 max-w-2xl text-sm ">Hybrid</p>
                <p className="mt-1 max-w-2xl text-sm ">CBD</p>
              </div>
            </div>
          </Link>
          <Link href={`/categories/edibles`}>
            <div className="bg-white cursor-pointer dark:bg-surface px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <h2 className=" font-medium text-gray-600 dark:text-white">
                Edibles
              </h2>
            </div>
          </Link>
          <Link href={`/categories/vaporizers`}>
            <div className="bg-gray-50 cursor-pointer dark:bg-surface2 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <h2 className=" font-medium text-gray-600 dark:text-white">
                Vaporizers
              </h2>
            </div>
          </Link>
        </dl>
      </div>
    </div>
  )
}
