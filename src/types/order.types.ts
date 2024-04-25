export interface OrderTableProps {
  orders: Order[]
  loading?: boolean
  onDeleteClick: (id: string) => void
}

export class ItemChunk {
  constructor(public id = "", public quantity = 0) {}
}

export interface Item {
  id: string
  name: string
  price: number
}

export interface OrderItem extends Item, ItemChunk {}

export class NewOrder {
  constructor(
    public items: ItemChunk[] = [],
    public customer_name = "",
    public customer_address = ""
  ) {}
}

export class Order extends NewOrder {
  constructor(
    public customer_name: string,
    public customer_address: string,
    public items: OrderItem[],
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

export type OrderFormProps<T = Order | undefined> = {
  initialValues?: T
  loading?: boolean
  sending?: boolean
  available_items: Item[]
  onSubmit: (order: T extends Order ? Order : NewOrder) => void
}
