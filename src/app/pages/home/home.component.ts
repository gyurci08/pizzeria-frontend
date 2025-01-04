import {Component} from '@angular/core';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {MenuItemService} from '../../menu-item/service/menu-item-service';
import {MenuItemsState} from '../../menu-item/entity/menu-items-state';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatLine} from '@angular/material/core';


@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatButton,
    NgForOf,
    NgIf,
    MatProgressSpinner,
    MatList,
    MatListItem,
    MatIcon,
    MatIconModule,
    MatLine
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

// TODO: Implement image for items and the relation of links. (db?)
export class HomeComponent {
  menuItemsState$: Observable<MenuItemsState>;

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

}
