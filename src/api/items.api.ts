import { Item } from "../types/order.types"
import { Axios } from "./axios"

export const ItemsApi = {
  READ: async () => await Axios.get<void, Item[]>("items"),
}
