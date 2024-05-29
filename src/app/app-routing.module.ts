import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'item-list', component: CustomerListComponent },
  { path: 'order-list', component: CustomerListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
