import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react"
import { OrderFormProps } from "./CreditOrder.type"
import { NewOrder } from "../Orders/Orders.type"
import { available_items } from "./CreditOrder.param"

const OrderForm = ({ initialValues, onSubmit }: OrderFormProps) => {
  const [formData, setFormData] = useState(initialValues || new NewOrder())

  const handleOrderChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleItemChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const items = [...formData.items]
    const { value, name } = event.target
    if (["price", "quantity"].includes(name)) {
      // @ts-expect-error idk
      items[index][name] = parseInt(value, 10)
    } else {
      // @ts-expect-error idk
      items[index][name] = value
      if (name === "name") {
        const price = available_items.find((ai) => ai.name === value)?.price
        if (price) items[index].price = price
      }
    }

    setFormData({ ...formData, items })
  }
  const handleDeleteItem = (index: number) => {
    const items = [...formData.items]
    items.splice(index, 1)
    setFormData({ ...formData, items })
  }

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: "1", name: "", price: 0, quantity: 0 }],
    })
  }

  const validateForm = () => {
    return true
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (validateForm()) {
      onSubmit(formData) // Pass validated form data to parent component
    } else {
      // Handle form validation errors (display error messages)
      console.error("Form validation failed")
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label
            htmlFor="customer_name"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Name
          </label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleOrderChange}
            className="input py-2 sm:text-sm mt-1 block"
            required
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="customer_address"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Address
          </label>
          <input
            name="customer_address"
            // value={formData.customer_address}
            onChange={handleOrderChange}
            className="input py-2 sm:text-sm mt-1 block"
            required
          />
        </div>
      </div>

      <div className="w-full">
        <table className="w-full border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-200 text-left text-xs font-semibold">
              <th className="px-2 py-1">Item</th>
              <th className="px-2 py-1">Price</th>
              <th className="px-2 py-1">Quantity</th>
              <th className="px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-2 py-1">
                  <select
                    name="name"
                    value={item.name}
                    onChange={(event) => handleItemChange(index, event)}
                    className="input"
                    required
                  >
                    <option value="" disabled>
                      Select Item
                    </option>
                    {available_items.map((ai, i) => (
                      <option value={ai.name} key={i + "-" + ai.name}>
                        {ai.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(event) => handleItemChange(index, event)}
                    className="input"
                    required
                    disabled
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    name="quantity"
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(event) => handleItemChange(index, event)}
                    className="input"
                    required
                  />
                </td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index)}
                    className="px-2 py-1 text-xs font-bold text-red-500 hover:bg-red-100 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md focus:outline-none"
          >
            Add Item
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialValues ? "Update Order" : "Create Order"}
      </button>
    </form>
  )
}

export default OrderForm
