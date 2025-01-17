import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderListComponent} from '../pages/order-list/order-list.component';
import {OrderNewComponent} from '../pages/order-new/order-new.component';

// TODO: Use standalone component for routing too

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent
  },
  {
    path: 'new',
    component: OrderNewComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
