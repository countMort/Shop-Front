const TableLoading = ({ colSpan }: { colSpan: number }) => (
  <tr className="animate-pulse border-b border-gray-300">
    <td
      className="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm text-center"
      colSpan={colSpan}
    >
      Loading...
    </td>
  </tr>
)

export default TableLoading
