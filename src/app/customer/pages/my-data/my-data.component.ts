import {Component} from '@angular/core';
import {CustomerService} from '../../service/customer-service';
import {Customer} from '../../entity/customer';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatList, MatListItem} from '@angular/material/list';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/form-field';

interface CustomerState {
  customer: Customer | null;
  isLoading: boolean;
  error: string | null;
}


@Component({
  selector: 'app-my-data',
  imports: [
    MatCard,
    MatCardTitle,
    NgIf,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    MatProgressSpinner,
    MatError,
    AsyncPipe
  ],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.scss'
})
export class MyDataComponent {
  customerState$: Observable<CustomerState>;

  constructor(private customerService: CustomerService) {
    this.customerState$ = this.loadCustomer();
  }

  loadCustomer(): Observable<CustomerState> {
    return this.customerService.getCustomer().pipe(
      map(customer => ({customer, isLoading: false, error: null})),
      startWith({customer: null, isLoading: true, error: null}),
      catchError(error => of({customer: null, isLoading: false, error: 'Failed to load customer. Please try again.'}))
    )
  }

}
