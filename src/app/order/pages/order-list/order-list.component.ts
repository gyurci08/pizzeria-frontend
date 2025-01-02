import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {Order} from '../../entity/order';
import {OrderService} from '../../service/order-service';
import {SearchableListComponent} from '../../../core/generics/searchable-list/searchable-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

interface OrderState {
  orders: Order[] | null;
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    SearchableListComponent,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  orderState$: Observable<OrderState>;

  constructor(private orderService: OrderService) {
    this.orderState$ = this.loadOrders();
  }

  loadOrders(): Observable<OrderState> {
    return this.orderService.getOrders().pipe(
      map(orders => ({orders, isLoading: false, error: null})),
      startWith({orders: null, isLoading: true, error: null}),
      catchError(error => of({orders: null, isLoading: false, error: 'Failed to load orders. Please try again.'}))
    );
  }

  onOrderClick(order: Order) {
    console.log('Order clicked:', order);
  }
}
