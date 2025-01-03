import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyDataComponent} from '../pages/my-data/my-data.component';


const routes: Routes = [
  {
    path: '',
    component: MyDataComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
