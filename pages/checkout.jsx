import AddressForm from "../components/Forms/AddressForm"
import Payment from "../components/Forms/Payment"
import commerce from "../lib/commerce"
import { useEffect, useState } from "react"
import { useCartState } from "../context/cart"
import BounceLoader from "react-spinners/BounceLoader"

const override = {
  display: "block",
  margin: "4rem auto",
  borderColor: "green",
}

export default function Checkout({ Container }) {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState()
  const [shippingData, setShippingData] = useState()
  const { id } = useCartState()
  let [loading, setLoading] = useState(true)
  let [color, setColor] = useState("#5DAB4E")

  useEffect(() => {
    async function getToken() {
      if (id) {
        try {
          const token = await commerce.checkout.generateToken(id, {
            type: "cart",
          })
          setCheckoutToken(token)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getToken()
  }, [id])

  const steps = [
    <AddressForm
      key={`addy`}
      setShippingData={(data) => {
        setShippingData(data)
        nextStep()
      }}
      checkoutToken={checkoutToken}
    />,
    <Payment
      key={`pay`}
      shippingData={shippingData}
      checkoutToken={checkoutToken}
    />,
  ]

  const nextStep = () => {
    setActiveStep((prev) => prev + 1)
  }

  return (
    <div>
      {checkoutToken ? (
        <>{steps[activeStep]}</>
      ) : (
        <Container>
          <div className="sweet-loading flex flex-col items-center justify-center w-full">
            <BounceLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={50}
            />
          </div>
        </Container>
      )}
    </div>
  )
}
