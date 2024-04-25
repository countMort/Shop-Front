import { useState, useEffect } from "react"
import OrdersTable from "../features/Orders/OrdersTable"
import Pagination from "../features/Orders/Pagination"
import { Link } from "react-router-dom"
import { OrdersApi } from "../api/orders.api"
import { Order } from "../types/order.types"
import Modal from "../features/UI/Modal"

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [deletingOrder, setDeletingOrder] = useState<string>()
  const [isDeleting, setIsDeleting] = useState(false)
  const itemsPerPage = 5

  useEffect(() => {
    OrdersApi.READ()
      .then((res) => {
        setOrders(res)
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const deleteOrder = async (id: string) => {
    try {
      setIsDeleting(true)
      await OrdersApi.DELETE(id)
      setOrders((orders) =>
        orders.filter((order) => order.id !== deletingOrder)
      )
    } catch (error) {
      console.log(error)
    } finally {
      setDeletingOrder(undefined)
      setIsDeleting(false)
    }
  }

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 flex justify-between">
        Order List
        <Link to="/new" className="text-lg font-normal button">
          Add New Order
        </Link>
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <OrdersTable
          orders={paginatedOrders}
          loading={loading}
          onDeleteClick={setDeletingOrder}
        />
      </div>
      {orders.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orders.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        title="Delete Order?"
        onApprove={() => deleteOrder(deletingOrder!)}
        loading={isDeleting}
        isOpen={Boolean(deletingOrder)}
        onClose={() => setDeletingOrder(undefined)}
      >
        Are you sure you want to delete the order #{deletingOrder}?
      </Modal>
    </>
  )
}

export default OrderList
