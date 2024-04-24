export interface OrderTableProps {
  orders: Order[]
}

export interface Item {
  id: string
  name: string
  quantity: number
  price: number
}

export class NewOrder {
  constructor(
    public items: Item[] = [],
    public customer_name = "",
    public customer_address = ""
  ) {}
}

export class Order extends NewOrder {
  constructor(
    public customer_name: string,
    public customer_address: string,
    public items: Item[],
    public total: number,
    public date: Date,
    public id: string = ""
  ) {
    super(items, customer_name, customer_address)
  }
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (new_page: number) => void
}
