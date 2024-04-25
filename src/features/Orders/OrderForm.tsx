import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  Item,
  ItemChunk,
  NewOrder,
  OrderFormProps,
} from "../../types/order.types"
import TableLoading from "../UI/TableLoading"
import Spinner from "../UI/Spinner"
import { DeleteButton } from "../UI/Button"

const OrderForm = ({
  initialValues,
  loading,
  sending,
  available_items,
  onSubmit,
}: OrderFormProps) => {
  const [formData, setFormData] = useState(new NewOrder([new ItemChunk()]))

  const available_items_obj = useMemo(() => {
    return available_items.reduce((pv, cv) => {
      return { ...pv, [cv.id]: cv }
    }, {} as Record<string, Item>)
  }, [available_items])

  const total = useMemo(() => {
    const items = formData.items
    return (
      items.reduce((pv, cv) => {
        return (pv += (available_items_obj[cv.id]?.price || 0) * cv.quantity)
      }, 0) || 0
    )
  }, [formData.items, available_items_obj])

  useEffect(() => {
    if (initialValues) setFormData(initialValues)
  }, [initialValues])

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
    const { name, value } = event.target
    if (name === "id") {
      items[index].id = event.target.value
    } else {
      items[index].quantity = parseInt(value, 10)
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
      items: [...formData.items, { id: "", quantity: 0 }],
    })
  }

  const validateForm = () => {
    return true
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (validateForm()) {
      const items_obj = formData.items.reduce((pv, cv) => {
        return { ...pv, [cv.id]: (pv[cv.id] || 0) + cv.quantity }
      }, {} as Record<string, number>)

      const items = Object.keys(items_obj).map((id) => ({
        id,
        quantity: items_obj[id],
      }))

      onSubmit({ ...formData, items })
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
            value={formData.customer_address}
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
            {loading ? (
              <TableLoading colSpan={4} />
            ) : (
              formData.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-2 py-1">
                    <select
                      name="id"
                      value={item.id}
                      onChange={(event) => handleItemChange(index, event)}
                      className="input"
                      required
                    >
                      <option value="" disabled>
                        Select Item
                      </option>
                      {available_items.map((ai, i) => (
                        <option value={ai.id} key={i + "-" + ai.name}>
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
                      value={available_items_obj[item.id]?.price || 0}
                      className="input"
                      required
                      disabled
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      name="quantity"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => handleItemChange(index, event)}
                      className="input"
                      required
                    />
                  </td>
                  <td className="px-2 py-1">
                    <DeleteButton onClick={() => handleDeleteItem(index)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && (
          <div className="flex justify-between mt-2">
            <div>
              Total: {total} $
              <button
                type="submit"
                className="ml-2 px-4 py-2 hover:bg-gray-100 font-bold rounded-md focus:outline-none border-2"
                disabled={!formData.items.length}
              >
                {sending ? (
                  <Spinner />
                ) : initialValues ? (
                  "Update Order"
                ) : (
                  "Create Order"
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 hover:bg-green-100 text-green-500 text-sm font-bold rounded-md focus:outline-none border-2 border-green-200"
            >
              + Add Item
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default OrderForm
