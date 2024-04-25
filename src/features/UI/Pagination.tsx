import { PaginationProps } from "../../types/order.types"

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center mt-4">
      <ul className="inline-flex list-style-none rounded-md shadow">
        <li>
          <button
            className="rounded-l-md px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {/* Pagination links for each page */}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`px-4 py-2 ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            className="rounded-r-md px-8 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
