import { useState, useEffect } from "react"
import OrdersTable from "../features/Orders/OrdersTable"
import Pagination from "../features/Orders/Pagination"
import { Link } from "react-router-dom"

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Adjust as needed

  useEffect(() => {
    fetch("http://localhost:9905/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.results)
      })
  }, [])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 flex justify-between">
        Order List
        <Link
          to="/new"
          className="text-lg font-normal px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none border-2"
        >
          Add New Order
        </Link>
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <OrdersTable orders={paginatedOrders} />
      </div>
      {orders.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orders.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}

export default OrderList
