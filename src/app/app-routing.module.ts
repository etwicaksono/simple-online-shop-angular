import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent, data: { title: "Home" } },
  { path: 'customer-list', component: CustomerListComponent, data: { title: "Customer List" } },
  { path: 'item-list', component: CustomerListComponent, data: { title: "Item List" } },
  { path: 'order-list', component: CustomerListComponent, data: { title: "Order List" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
