import { OrderTableProps } from "./Orders.type"

const OrdersTable = ({ orders }: OrderTableProps) => {
  return (
    <table className="w-full min-w-full leading-normal table-collapse border-collapse">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Customer Name
          </th>
          <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Date Ordered
          </th>
          <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Total Amount
          </th>
          <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {order.id}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {order.customer_name}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {/* {order.date.getFullYear() +
                "/" +
                order.date.getDate()} +
                "/" +
                order.date.getMonth()
                 */}
              2024/24/2
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {order.total}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {/* {order.status} */}
              NN
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {/* Add action buttons/links here based on your requirements */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrdersTable
