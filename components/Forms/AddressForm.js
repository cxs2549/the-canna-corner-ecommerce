import { useState } from "react"
import { useForm } from "react-hook-form"
import CountrySelect from "./CountrySelect"
import FormInput from "./FormInput"

const addressparams = [
  { name: "firstname", type: "text", value: "Cliff" },
  { name: "lastname", type: "text", value: "Sanchez" },
  { name: "address1", type: "text", value: "950 S Westmoreland Ave." },
  { name: "email", type: "email", value: "sanchezcliff86@gmail.com" },
  { name: "city", type: "text", value: "Los Angeles" },
  { name: "zip", type: "text", value: "90006" },
]

const Container = ({ children }) => <div className="p-5">{children}</div>

export default function AddressForm({ checkoutToken, setShippingData }) {
  const { handleSubmit, register, setValue } = useForm()
  const [disabled, setDisabled] = useState(true)

  const submitData = (data) => {
    setShippingData(data)
  }
  return (
    <div className="pb-12  flex max-w-5xl mx-auto flex-col">
      <Container animated>
        <h2 className="mb-8">Delivery Details</h2>
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col gap-2"
        >
          {addressparams.map((param) => {
            return (
              <FormInput
                key={param.name}
                param={param}
                register={register}
                value={param.value}
              />
            )
          })}
          <CountrySelect
            setDisabled={setDisabled}
            setValue={setValue}
            checkoutToken={checkoutToken}
            register={register}
          />
          <button
            className="py-4 font-semibold text-lg mt-4 rounded-full dark:bg-indigo-600 dark:text-white text-slate-700"
            type="submit"
          >
            Payment &rarr;
          </button>
        </form>
      </Container>
    </div>
  )
}
