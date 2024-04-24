import { Order, NewOrder } from "../Orders/Orders.type"

export type OrderFormProps<T = Order | undefined> = {
  initialValues?: T
  onSubmit: (order: T extends undefined ? NewOrder : Order) => void
}
