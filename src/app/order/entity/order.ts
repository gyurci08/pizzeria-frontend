export class Order {
  constructor(
    public id: number,
    public customerId: number,
    public customerName: String,
    public orderDate: Date,
    public totalAmount: number,
    public status: String
  ) {
  }
}
