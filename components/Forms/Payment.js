import React, { useState } from "react"
import { useForm } from "react-hook-form"
import FormInput from "./FormInput"
import commerce from "../../lib/commerce"
import { useCartDispatch, useCartState } from "../../context/cart"
import Link from "next/link"
// import Container from "../Container"
const Container = ({ children }) => <div className="p-5">{children}</div>

export default function Payment({ shippingData, checkoutToken }) {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState()
  const [error, setError] = useState()
  const { reset: resetCart } = useCartDispatch()
  const state = useCartState()

  const { handleSubmit, register } = useForm()

  //

  // const shippingcharges =
  //   checkoutToken.shipping_methods[0].price.formatted_with_symbol

  async function payNow(carddata) {
    setLoading(true)
    setError()

    const orderDetails = {
      line_items: checkoutToken.live.line_items,
      customer: {
        email: shippingData.email,
        firstname: shippingData.firstname,
        lastname: shippingData.lastname,
      },
      // shipping: {
      //   name: "Primary",
      //   street: shippingData.address1,
      //   town_city: shippingData.city,
      //   county_state: "CA",
      //   postal_zip_code: shippingData.zip,
      //   country: shippingData.country,
      // },
      // fulfillment: {
      //   shipping_method: shippingData["shipping-options"],
      // },
    }

    await commerce.checkout
      .capture(checkoutToken.id, {
        ...orderDetails,
        payment: {
          gateway: "test_gateway",
          card: {
            number: carddata.Number,
            expiry_month: carddata.Expiry_Month,
            expiry_year: carddata.Expiry_Year,
            cvc: carddata.CVC,
            postal_zip_code: carddata.Postal_ZIP_Code,
          },
        },
      })
      .then((res) => {
        setOrder(res)
        resetCart()
      })
      .catch(({ data }) => {
        setError(data?.error?.message)
        setLoading(false)
      })
  }
  const bigFunc = (carddata) => {
    payNow(carddata)
  }
  return (
    <div className=" max-w-5xl mx-auto flex flex-col pb-24">
      {order ? (
        <Container animated className="flex flex-col gap-8">
          <h2 className="text-xl">
            {" "}
            Thank you for ordering w us!
            <br />
            <small>
              Order reference #: <br /> {order.customer_reference}
            </small>
          </h2>

          <h2 className="text-xl">
            {" "}
            Total payment : {order.order.total.formatted_with_symbol}
          </h2>
          <Link href="/">
            <button>Take me home</button>
          </Link>
        </Container>
      ) : (
        <Container animated className="flex flex-col">
          <div>
            <h2 className="text-4xl mb-8 flex flex-col">Payment Gateway</h2>
            <h2 className="text-base">
              {shippingData.firstname} {shippingData.lastname}
            </h2>
            <p>{shippingData.address1}</p>
            <p>{shippingData.email}</p>
            <p> {shippingData.city}, CA</p>
            <p> {shippingData.zip}</p>
            <h4 className="py-8">Your Items</h4>
            <ul className="pb-4">
              {checkoutToken.live.line_items.map((item) => {
                return (
                  <li key={item.product_name}>
                    {item.product_name} -{" "}
                    {item.line_total.formatted_with_symbol} (Quantity:{" "}
                    {item.quantity})
                  </li>
                )
              })}
            </ul>

            {error && <h3>Error : {error}</h3>}
            {loading ? (
              <p>Wait while we process your data</p>
            ) : (
              <div>
                <h2 className="text-2xl mb-4">Pay w Credit/Debit</h2>
                <form onSubmit={handleSubmit(bigFunc)}>
                  <FormInput
                    param={{
                      name: "Number",
                      type: "number",
                    }}
                    register={register}
                  />
                  <FormInput
                    param={{
                      name: "Expiry_Month",
                      type: "number",
                    }}
                    register={register}
                  />
                  <FormInput
                    param={{
                      name: "Expiry_Year",
                      type: "number",
                    }}
                    register={register}
                  />
                  <FormInput
                    param={{
                      name: "CVC",
                      type: "number",
                    }}
                    register={register}
                  />
                  <FormInput
                    param={{
                      name: "Postal_ZIP_Code",
                      type: "number",
                    }}
                    register={register}
                  />
                  <button
                    className="py-4 font-semibold text-lg mt-4 rounded-full dark:bg-indigo-600 dark:text-white text-slate-700 w-full mb-4"
                    type="submit"
                  >
                    Pay &rarr;
                  </button>
                </form>
              </div>
            )}
          </div>
          <div>
            Grand total: <pre>{state.subtotal.formatted_with_symbol}</pre>
          </div>
        </Container>
      )}
    </div>
  )
}
