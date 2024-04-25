import { NewOrder, Order } from "../types/order.types"
import { Axios } from "./axios"

export const OrdersApi = {
  READ: async () => await Axios.get<void, Order[]>("orders"),
  READ_ONE: async (id: string) => await Axios.get<void, Order>("orders/" + id),
  POST: async (data: NewOrder) =>
    await Axios.post<NewOrder, Order>("orders", data),
  PUT: async (data: NewOrder, id: string) =>
    Axios.put<NewOrder, Order>("orders/" + id, data),
  DELETE: async (id: string) => Axios.delete("orders/" + id),
}
