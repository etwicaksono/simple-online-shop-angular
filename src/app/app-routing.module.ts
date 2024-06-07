import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';
import { ItemListComponent } from './feature/item/item-list/item-list.component';
import { OrderListComponent } from './feature/order/order-list/order-list.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent, data: { title: "Home" } },
  { path: 'customer-list', component: CustomerListComponent, data: { title: "Customer List" } },
  { path: 'item-list', component: ItemListComponent, data: { title: "Item List" } },
  { path: 'order-list', component: OrderListComponent, data: { title: "Order List" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
