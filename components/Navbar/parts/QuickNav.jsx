import Link from "next/link"
import Btn from "../../common/Btn"
import { useRouter } from "next/router"

import React from "react"

const QuickNav = ({ categories }) => {
  const router = useRouter()
  return (
    <div
      id="qnav"
      className=" rounded-xl  xl:px-0 hidden sm:flex flex-wrap flex-row-reverse justify-end gap-2 w-full mt-4"
    >
      {categories &&
        categories.map((cat) => (
          <Link href={`/categories/${cat.slug}`}>
            <Btn
              classes={`${
                router.asPath === "/categories/" + cat.slug && "active"
              } border dark:border-slate-600 dark:text-slate-400`}
            >
              <p className="text-sm">{cat.name}</p>
            </Btn>
          </Link>
        ))}
      <Link href="/">
        <Btn
          classes={`${
            router.asPath === "/" && "active"
          } border dark:border-slate-600 dark:text-slate-400`}
        >
          Home
        </Btn>
      </Link>
    </div>
  )
}
export default QuickNav
