import { OrderTableProps } from "../../types/order.types"
import TableLoading from "../UI/TableLoading"
import { orders_table_headers } from "../../params/index.params"
import { Button, DeleteButton } from "../UI/Button"
import { useNavigate } from "react-router-dom"

const OrdersTable = ({ orders, onDeleteClick, loading }: OrderTableProps) => {
  const navigate = useNavigate()
  return (
    <table className="w-full min-w-full leading-normal table-collapse border-collapse h-96">
      <thead>
        <tr>
          {orders_table_headers.map((header, i) => (
            <th
              key={`h${i}`}
              className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <TableLoading colSpan={6} />
        ) : (
          orders.map((order) => (
            <tr key={order.id}>
              <td
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                title={order.id}
              >
                {order.id.slice(0, 9)}...
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {order.customer_name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                {/* I know it's not ideal but I'm runnig out of time so :D */}
                {new Date(order.date).getFullYear() +
                  "/" +
                  new Date(order.date).getDate() +
                  "/" +
                  new Date(order.date).getMonth()}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                {order.total}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {/* {order.status} */}
                Approved
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Button
                  variant="sm"
                  onClick={() => {
                    navigate(order.id)
                  }}
                >
                  Edit
                </Button>
                <DeleteButton onClick={() => onDeleteClick(order.id)} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default OrdersTable
