import {OrderItemSaveDto} from '../../order-item/entity/order-item-save-dto';

export interface OrderSaveDto {
  customerId: number;
  totalAmount: number;
  orderItems: OrderItemSaveDto[];
}
