import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDialogComponent } from '@app/core/components/customer-dialog/customer-dialog.component';
import { Order } from '@app/core/models/order';
import { OrderService } from '@app/core/services/order.service';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements AfterViewInit {
  private orderList: Order[] = [];
  displayedColumns: string[] = ['order_code', 'customer_name', 'item_name', 'qty', 'total_price', 'actions'];
  dataSource = new MatTableDataSource<Order>(this.orderList);
  pageNumber?: number = 0
  pageSize?: number = 100 // #marked: onlydev
  sortDirection?: string = "ASC"
  customerName?: string = ""
  customerAddress?: string = ""
  customerCode?: string = ""
  customerPhone?: string = ""
  isActive?: boolean | null = null // #marked: onlydev
  printReportUrl = environment.apiUrl + '/order/report'

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private orderService: OrderService,
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

    this.orderService.getOrderList(params).subscribe((res) => {
      this.orderList = res.data.data;
      this.dataSource = new MatTableDataSource<Order>(this.orderList);
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

  viewDetails(order: Order): void {
    // Implement view details functionality
    console.log('View details for', order);
  }

  updateOrder(order: Order): void {
    // Implement update functionality
    console.log('Update order', order);
  }

  deleteOrder(order: Order): void {
    // Implement delete functionality
    this.confirmationService.confirm({
      message: `Apakah Anda yakin ingin menghapus order ini?`,
      header: 'Konfirmasi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (order === undefined || order === null) return;
        this.orderService.deleteOrder(order.orderId).pipe(
          catchError(error => {
            console.error('Error deleting order:', error);
            // Optionally, show an error message to the user
            const dialogRef = this.dialog.open(CustomerDialogComponent, {
              panelClass: 'custom-fav-dialog',
              data: { message: 'Error deleting order. Please try again later.' }
            });
            // Return an empty observable to complete the stream
            return of(null);
          })
        ).subscribe(response => {
          const dialogRef = this.dialog.open(CustomerDialogComponent, {
            panelClass: 'custom-fav-dialog',
          })
          this.loadCustomerList()
        })
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT) {
          console.log('MatTableDataSourceOrder deletion rejected');
        } else if (type === ConfirmEventType.CANCEL) {
          console.log('MatTableDataSourceOrder deletion cancelled');
        }
      },
    });
  }
}
