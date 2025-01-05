import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {MenuItemsState} from '../../../menu-item/entity/menu-items-state';
import {MenuItemService} from '../../../menu-item/service/menu-item-service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MenuItem} from '../../../menu-item/entity/menu-item';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {OrderItemSaveDto} from '../../../order-item/entity/order-item-save-dto';

@Component({
  selector: 'app-order-new',
  imports: [
    MatCard,
    MatCardHeader,
    NgForOf,
    MatCardContent,
    NgIf,
    MatCheckbox,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './order-new.component.html',
  styleUrl: './order-new.component.scss'
})
export class OrderNewComponent {
  menuItemsState$: Observable<MenuItemsState>;
  selectedItems: MenuItem[] = [];
  orderItems: OrderItemSaveDto[] = [];


  constructor(private menuItemService: MenuItemService) {
    this.menuItemsState$ = this.loadMenuItems();
  }

  loadMenuItems(): Observable<MenuItemsState> {
    return this.menuItemService.getItems().pipe(
      map(items => ({menuItems: items, isLoading: false, error: null})),
      startWith({menuItems: null, isLoading: true, error: null}),
      catchError(error => of({menuItems: null, isLoading: false, error: 'Failed to load menu items'}))
    );
  }

  toggleSelection(item: MenuItem): void {
    const index = this.selectedItems.findIndex(selected => selected.id === item.id);
    if (index === -1) {
      this.selectedItems.push(item); // Add item if not already selected
    } else {
      this.selectedItems.splice(index, 1); // Remove item if already selected
    }
  }

  submitOrder(): void {
    this.orderItems = this.selectedItems.map(item => ({
      menuItemId: item.id,
      quantity: 1
    }));
    console.log('Order Items:', this.orderItems);
  }
}
