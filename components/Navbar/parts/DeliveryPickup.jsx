import { useState } from "react"
import Btn from "../../common/Btn"

const DeliveryPickup = () => {
  const [isDelivery, setDelivery] = useState(true)
  return (
    <div className="flex gap-1 justify-end w-full">
      <Btn
        onClick={() => setDelivery(true)}
        classes={`${isDelivery ? "active" : "text-slate-400"}`}
      >
        <span className="text-[13px] iPhone:text-sm">Delivery</span>
      </Btn>
      <Btn
        onClick={() => setDelivery(false)}
        classes={!isDelivery ? "active" : "text-slate-400"}
      >
                <span className="text-[13px] iPhone:text-sm">Pickup</span>

      </Btn>
    </div>
  )
}
export default DeliveryPickup
