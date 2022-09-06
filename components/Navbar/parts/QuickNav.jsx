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
              } border text-slate-300 dark:border-slate-600 dark:text-slate-400`}
            >
              <p className="text-sm">{cat.name}</p>
            </Btn>
          </Link>
        ))}
      <Link href="/">
        <Btn
          classes={`${
            router.asPath === "/" && "active"
          } border text-slate-300 dark:border-slate-600 dark:text-slate-400 text-sm`}
        >
          <p className="text-sm">Home</p>
        </Btn>
      </Link>
    </div>
  )
}
export default QuickNav
