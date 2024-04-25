import { useEffect, useState } from "react"
import OrderForm from "../features/CreditOrder/OrderForm"
import { Item, NewOrder } from "../types/order.types"
import { ItemsApi } from "../api/items.api"
import { OrdersApi } from "../api/orders.api"

const NewOrderPage = () => {
  const [available_items, setAvailableItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    ItemsApi.READ()
      .then((e) => {
        setAvailableItems(e)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleOrderSubmit = async (formData: NewOrder) => {
    try {
      setSending(true)
      await OrdersApi.POST(formData)
    } catch (error) {
      console.log(error)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create New Order</h1>
      <OrderForm
        available_items={available_items}
        loading={loading}
        sending={sending}
        onSubmit={handleOrderSubmit}
      />
    </>
  )
}

export default NewOrderPage
