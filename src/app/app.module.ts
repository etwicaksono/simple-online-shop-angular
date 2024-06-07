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

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    HeaderComponent,
    CustomerDialogComponent,
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
  ],
  providers: [
    Title,
    provideAnimationsAsync(),
    [ConfirmationService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
