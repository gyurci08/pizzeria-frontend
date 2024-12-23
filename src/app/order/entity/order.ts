import {AutoAssign} from '../../core/decorator/auto-assign.decorator';

@AutoAssign()
export class Order {
  id!: number;
  customerId!: number;
  orderDate!: Date;
  totalAmount!: number;
  status!: String;
}
