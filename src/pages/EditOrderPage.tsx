import { useState, useEffect } from "react"
import { Item, NewOrder, Order } from "../types/order.types"
import { useParams } from "react-router-dom"
import { OrdersApi } from "../api/orders.api"
import OrderForm from "../features/Orders/OrderForm"
import { ItemsApi } from "../api/items.api"

const OrderPage = () => {
  const [order, setOrder] = useState<Order>()
  const { id: order_id } = useParams()
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [available_items, setAvailableItems] = useState<Item[]>([])

  useEffect(() => {
    if (order_id) {
      const order_request = OrdersApi.READ_ONE(order_id)
      const items_request = ItemsApi.READ()
      Promise.all([order_request, items_request])
        .then((res) => {
          setOrder(res[0])
          setAvailableItems(res[1])
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false)
        })
    }
  }, [order_id])

  const handleOrderSubmit = async (formData: Order | NewOrder) => {
    try {
      setSending(true)
      if ("id" in formData) await OrdersApi.PUT(formData, formData.id)
    } catch (error) {
      console.log(error)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <h1 className="md:text-3xl font-bold mb-4 text-sm">
        Edit Order: #{order_id}
      </h1>
      <OrderForm
        initialValues={order}
        available_items={available_items}
        loading={loading}
        sending={sending}
        onSubmit={handleOrderSubmit}
      />
    </>
  )
}

export default OrderPage
