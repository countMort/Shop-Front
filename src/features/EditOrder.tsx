import { useState, useEffect } from "react"
import OrderForm from "../components/OrderForm"

const EditOrder = ({ match }) => {
  const orderId = match.params.id // Get order ID from URL parameter
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Fetch order details from API using orderId
    fetch(`/api/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrderData(data))
  }, [orderId])

  if (!orderData) {
    return <div>Loading order details...</div>
  }

  const handleOrderSubmit = (formData) => {
    // Send updated order data to API using a library like Axios
    fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    }).then(() => {
      // Handle successful order update (e.g., navigate back to order details)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Order (ID: {orderId})</h1>
      <OrderForm initialValues={orderData} onSubmit={handleOrderSubmit} />
    </div>
  )
}

export default EditOrder
