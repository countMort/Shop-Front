import { useState, useEffect } from "react"
import { Order } from "../features/Orders/Orders.type"
import { useParams } from "react-router-dom"

const OrderPage = () => {
  const [order, setOrder] = useState<Order>()
  const { id: order_id } = useParams()

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("store") || "") as
      | Order[]
      | null
    setOrder(orders?.find((o) => o.id === order_id))
  }, [order_id])

  if (!order) {
    return <div>Loading order details...</div>
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">
        Order Details (ID: {order.id})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 font-bold mb-2">Customer Information</p>
        </div>
        <div>
          <p className="text-gray-700 font-bold mb-2">Order Items</p>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <div>{item.name}</div>
              <div>
                Qty: {item.quantity} - Price: ${item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderPage
