import { Customer } from "./customer"
import { Item } from "./item"

export class Order {
  orderId!: number
  orderCode?: string
  orderDate?: Date
  totalPrice?: number
  quantity!: number
  customer!: Customer
  item!: Item
}
