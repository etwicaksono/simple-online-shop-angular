import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';
import { ItemListComponent } from './feature/item/item-list/item-list.component';
import { OrderListComponent } from './feature/order/order-list/order-list.component';
import { CustomerCreateComponent } from './feature/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './feature/customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './feature/customer/customer-detail/customer-detail.component';
import { ItemCreateComponent } from './feature/item/item-create/item-create.component';
import { ItemEditComponent } from './feature/item/item-edit/item-edit.component';
import { ItemDetailComponent } from './feature/item/item-detail/item-detail.component';
import { OrderCreateComponent } from './feature/order/order-create/order-create.component';
import { OrderEditComponent } from './feature/order/order-edit/order-edit.component';
import { OrderDetailComponent } from './feature/order/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent, data: { title: "Home" } },
  { path: 'customer/list', component: CustomerListComponent, data: { title: "Customer List" } },
  { path: 'customer/create', component: CustomerCreateComponent, data: { title: "Create Customer" } },
  { path: 'customer/edit/:customerID', component: CustomerEditComponent, data: { title: "Edit Customer" } },
  { path: 'customer/detail/:customerID', component: CustomerDetailComponent, data: { title: "Customer Detail" } },
  { path: 'item/list', component: ItemListComponent, data: { title: "Item List" } },
  { path: 'item/create', component: ItemCreateComponent, data: { title: "Create Item" } },
  { path: 'item/edit/:itemID', component: ItemEditComponent, data: { title: "EditItem" } },
  { path: 'item/detail/:itemID', component: ItemDetailComponent, data: { title: "Item Detail" } },
  { path: 'order/list', component: OrderListComponent, data: { title: "Order List" } },
  { path: 'order/create', component: OrderCreateComponent, data: { title: "Create Order" } },
  { path: 'order/edit/:orderID', component: OrderEditComponent, data: { title: "Edit Order" } },
  { path: 'order/detail/:orderID', component: OrderDetailComponent, data: { title: "Order Detail" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
