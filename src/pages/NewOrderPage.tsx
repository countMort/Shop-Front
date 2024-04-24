import OrderForm from "../features/CreditOrder/OrderForm"
import { NewOrder } from "../features/Orders/Orders.type"

const NewOrderPage = () => {
  const handleOrderSubmit = (formData: NewOrder) => {
    // Send new order data to API using a library like Axios
    fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(formData),
    }).then(() => {
      // Handle successful order creation (e.g., navigate back to orders list)
    })
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create New Order</h1>
      <OrderForm onSubmit={handleOrderSubmit} />
    </>
  )
}

export default NewOrderPage
