import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerDialogComponent } from '@app/core/components/customer-dialog/customer-dialog.component';
import { Item } from '@app/core/models/item';
import { ItemService } from '@app/core/services/item.service';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements AfterViewInit {
  private itemList: Item[] = [];
  displayedColumns: string[] = ['code', 'name', 'stock', 'price', 'isAvailable', 'actions'];
  dataSource = new MatTableDataSource<Item>(this.itemList);
  pageNumber?: number = 0
  pageSize?: number = 100 // #marked: onlydev
  sortDirection?: string = "ASC"
  itemName?: string = ""
  itemCode?: string = ""
  stock?: number = 0
  price?: number = 0
  isAvailable?: boolean | null = null // #marked: onlydev
  printReportUrl = environment.apiUrl + '/item/report'

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private itemService: ItemService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.loadItemList()
  }

  loadItemList(): void {
    let params: {
      pageNumber?: number
      pageSize?: number
      sortDirection?: string
      itemName?: string
      itemCode?: string
      stock?: number
      price?: number
      isAvailable?: boolean
    } = {}

    if (this.pageNumber != null) params.pageNumber = this.pageNumber
    if (this.pageSize) params.pageSize = this.pageSize
    if (this.sortDirection) params.sortDirection = this.sortDirection
    if (this.itemName) params.itemName = this.itemName
    if (this.itemCode) params.itemCode = this.itemCode
    if (this.stock) params.stock = this.stock
    if (this.price) params.price = this.price
    if (this.isAvailable != null) params.isAvailable = this.isAvailable

    this.itemService.getItemList(params).subscribe((res) => {
      this.itemList = res.data.data;
      this.dataSource = new MatTableDataSource<Item>(this.itemList);
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

  viewDetails(item: Item): void {
    this.router.navigate(['/item/detail', item.itemsID]);
  }

  editItem(item: Item): void {
    this.router.navigate(['/item/edit', item.itemsID]);
  }

  deleteItem(item: Item): void {
    // Implement delete functionality
    this.confirmationService.confirm({
      message: `Apakah Anda yakin ingin menghapus item ini?`,
      header: 'Konfirmasi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (item === undefined || item === null) return;
        this.itemService.deleteItem(item.itemsID).pipe(
          catchError(error => {
            console.error('Error deleting item:', error);
            // Optionally, show an error message to the user
            const dialogRef = this.dialog.open(CustomerDialogComponent, {
              panelClass: 'custom-fav-dialog',
              data: { message: 'Error deleting item. Please try again later.' }
            });
            // Return an empty observable to complete the stream
            return of(null);
          })
        ).subscribe(response => {
          const dialogRef = this.dialog.open(CustomerDialogComponent, {
            panelClass: 'custom-fav-dialog',
          })
          this.loadItemList()
        })
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT) {
          console.log('Item deletion rejected');
        } else if (type === ConfirmEventType.CANCEL) {
          console.log('Item deletion cancelled');
        }
      },
    });
  }

}
