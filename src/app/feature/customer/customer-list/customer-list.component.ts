import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from '@app/core/services/customer.service';
import { Customer } from '@app/core/models/customer';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDialogComponent } from '@app/core/components/customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements AfterViewInit {
  private customerList: Customer[] = [];
  displayedColumns: string[] = ['code', 'name', 'address', 'phone', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Customer>(this.customerList);
  pageNumber?: number = 0
  pageSize?: number = 100 // #marked: onlydev
  sortDirection?: string = "ASC"
  customerName?: string = ""
  customerAddress?: string = ""
  customerCode?: string = ""
  customerPhone?: string = ""
  isActive?: boolean | null = null // #marked: onlydev

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.loadCustomerList()
  }

  loadCustomerList(): void {
    let params: {
      pageNumber?: number
      pageSize?: number
      sortDirection?: string
      customerName?: string
      customerAddress?: string
      customerCode?: string
      customerPhone?: string
      isActive?: boolean
    } = {}

    if (this.pageNumber != null) params.pageNumber = this.pageNumber
    if (this.pageSize) params.pageSize = this.pageSize
    if (this.sortDirection) params.sortDirection = this.sortDirection
    if (this.customerName) params.customerName = this.customerName
    if (this.customerAddress) params.customerAddress = this.customerAddress
    if (this.customerCode) params.customerCode = this.customerCode
    if (this.customerPhone) params.customerPhone = this.customerPhone
    if (this.isActive != null) params.isActive = this.isActive

    this.customerService.getCustomerList(params).subscribe((res) => {
      console.log('res :', res)
      this.customerList = res.data.data;
      this.dataSource = new MatTableDataSource<Customer>(this.customerList);
    })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewDetails(customer: Customer): void {
    // Implement view details functionality
    console.log('View details for', customer);
  }

  updateCustomer(customer: Customer): void {
    // Implement update functionality
    console.log('Update customer', customer);
  }

  deleteCustomer(customer: Customer): void {
    // Implement delete functionality
    console.log('Delete customer', customer);
    this.customerService.deleteCustomer(customer.customerID)
    this.confirmationService.confirm({
      message: `Apakah Anda yakin ingin menghapus resep ini dari favorit?`,
      header: 'Konfirmasi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (customer === undefined || customer === null) return;
        this.customerService.deleteCustomer(customer.customerID).subscribe(response => {
          const dialogRef = this.dialog.open(CustomerDialogComponent, {
            panelClass: 'custom-fav-dialog',
          })
        })
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT) {
          console.log('Customer deletion rejected');
        } else if (type === ConfirmEventType.CANCEL) {
          console.log('Customer deletion cancelled');
        }
      },
    });
  }
}

