import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, tap} from 'rxjs';
import {Order} from '../entity/order';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrdersWithNames(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/with-customer-names`);
  }


  createOrder(dto: Omit<Order, 'id' | 'customerName'>): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}`, dto);
  }


}
