import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderService} from '../../service/order-service';
import {Order} from '../../entity/order';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-order-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss'
})
export class OrderCreateComponent {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.min(1)]],
      orderItems: this.fb.array([]),
      status: ['PENDING', Validators.required]
    });
    this.addOrderItem();
  }

  get orderItems() {
    return this.orderForm.get('orderItems') as FormArray;
  }

  addOrderItem() {
    const orderItem = this.fb.group({
      menuItemId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.orderItems.push(orderItem);
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = {
        ...this.orderForm.value,
        orderDate: new Date().toISOString()
      };
      this.orderService.createOrder(orderData).subscribe(
        response => {
          console.log('Order created successfully', response);
        },
        error => {
          console.error('Error creating order', error);
        }
      );
    }
  }
}
