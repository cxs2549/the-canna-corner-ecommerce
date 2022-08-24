import { useEffect, useState } from "react"
import commerce from "../../lib/commerce"
import { useProductsState } from "../../context/products"
import Card from "../../components/Categories/Card/Card"
import Btn from "../../components/common/Btn"

export async function getStaticProps({ params }) {
  const { slug } = params
  const category = await commerce.categories.retrieve(slug, { type: "slug" })
  return {
    props: {
      category,
    },
  }
}

export async function getStaticPaths() {
  const { data: categories } = await commerce.categories.list()
  return {
    paths: categories.map((cat) => ({
      params: {
        slug: cat.slug,
      },
    })),
    fallback: false,
  }
}

const Categories = ({ category, Container }) => {
  const { data: products } = useProductsState()
  const specificProducts = products?.filter(
    (obj) => obj.categories[0]?.slug === category.slug
  )

  return (
    <Container classes="flex flex-col dark:bg-surface dark:text-white">
      <div className="w-full">
        <h2 className="mb-8">
          {category.name} <span>({category.products})</span>
        </h2>
      </div>
      <div className="w-full flex flex-wrap gap-2 text-sm py-2.5 mb-4">
        <Btn text="All" classes="bg-green-500 active text-sm">
          <p className="text-sm">All</p>
        </Btn>
        <Btn
          text="Trending in LA"
          classes={`border text-slate-300 dark:border-slate-600  text-sm`}
        >
          <p className="text-sm">Trending in LA</p>
        </Btn>
        {category.children.map((child, i) => (
          <Btn
            onklick={() => filterProducts(child.slug)}
            classes={`border dark:border-slate-600 text-slate-300`}
            key={i}
          >
            <p className="text-sm">{child.name}</p>
          </Btn>
        ))}
      </div>
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between w-full gap-x-2 gap-y-4">
        {specificProducts?.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </ul>
    </Container>
  )
}
export default Categories
