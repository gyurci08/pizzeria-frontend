import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, NgFor} from '@angular/common';
import {Observable} from 'rxjs';
import {Order} from '../../entity/order';
import {OrderService} from '../../service/order-service';

@Component({
  selector: 'app-order-list',
  imports: [
    CommonModule,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$=orderService.getOrders();
  }

  ngOnInit() {

  }

}
