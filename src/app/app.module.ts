import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CustomerDialogComponent } from './core/components/customer-dialog/customer-dialog.component';
import { ConfirmationService } from 'primeng/api';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { ItemListComponent } from './feature/item/item-list/item-list.component';
import { OrderListComponent } from './feature/order/order-list/order-list.component';
import { CustomerCreateComponent } from './feature/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './feature/customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './feature/customer/customer-detail/customer-detail.component';
import { ItemCreateComponent } from './feature/item/item-create/item-create.component';
import { ItemDetailComponent } from './feature/item/item-detail/item-detail.component';
import { ItemEditComponent } from './feature/item/item-edit/item-edit.component';
import { OrderCreateComponent } from './feature/order/order-create/order-create.component';
import { OrderDetailComponent } from './feature/order/order-detail/order-detail.component';
import { OrderEditComponent } from './feature/order/order-edit/order-edit.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    HeaderComponent,
    CustomerDialogComponent,
    ItemListComponent,
    OrderListComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    CustomerDetailComponent,
    ItemCreateComponent,
    ItemDetailComponent,
    ItemEditComponent,
    OrderCreateComponent,
    OrderDetailComponent,
    OrderEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSort,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SidebarModule,
    MatPaginator,
    MatDialogModule,
    ConfirmDialogModule,
    NgxDropzoneModule,
    QuillModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    Title,
    provideAnimationsAsync(),
    [ConfirmationService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
