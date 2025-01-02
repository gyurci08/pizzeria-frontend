import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../entity/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {
  }

  // getCustomers(): Observable<Customer[]> {
  //   return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  // }

  getCustomer(): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customers`);
  }


  createCustomer(dto: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}`, dto);
  }

}
