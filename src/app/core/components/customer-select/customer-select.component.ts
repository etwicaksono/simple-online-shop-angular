import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '@app/core/services/customer.service';

@Component({
  selector: 'app-customer-select',
  templateUrl: './customer-select.component.html',
  styleUrl: './customer-select.component.css'
})
export class CustomerSelectComponent {
  data: any[] = [];
  selectedItem: any = null;
  loading = false;

  @Output() change = new EventEmitter<any>();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(searchTerm: string = ''): void {
    this.loading = true;
    this.customerService.getCustomerForSelect(searchTerm).subscribe({
      next: (res) => {
        this.data = res?.data?.data;
        this.loading = false;
      },
      error: (res: HttpErrorResponse) => {
        console.error("getCustomerForSelect error: ", res);
        this.loading = false;
      }
    });
  }

  onSearch(event: { term: string; items: any[] }): void {
    this.loadData(event.term);
    this.emitSelectedValue(null);
  }

  onClear(): void {
    this.loadData('');
    this.selectedItem = null;
  }

  onChange(selected: any): void {
    console.log('[CustomerSelectComponent] Selected Item:', selected);
    this.emitSelectedValue(this.selectedItem);
  }

  private emitSelectedValue(value: any): void {
    this.change.emit(value);
  }
}
