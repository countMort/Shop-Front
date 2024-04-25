export const base_url = "http://localhost:9905/"
export const items_base_url = base_url + "items"
export const orders_base_url = base_url + "orders"
export const users_base_url = base_url + "users"

export const orders_table_headers = [
  "Order ID",
  "Customer Name",
  "Date Ordered",
  "Total Amount",
  "Status",
  "Actions",
]

export const button_variants = {
  sm: {
    className: "px-2 py-1 text-xs",
  },
  md: {
    className: "px-4 py-2",
  },
}
