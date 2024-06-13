import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomerService } from '@app/core/services/customer.service';

@Component({
  selector: 'app-customer-select',
  templateUrl: './customer-select.component.html',
  styleUrl: './customer-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerSelectComponent),
      multi: true
    }
  ]
})
export class CustomerSelectComponent implements OnInit, ControlValueAccessor {
  data: any[] = [];
  loading = false;
  isDisabled = false; // State to track if the component is disabled

  @Input() selectedItem: any;
  @Output() change = new EventEmitter<any>();

  constructor(private customerService: CustomerService) { }

  // ControlValueAccessor implementation
  writeValue(obj: any): void {
    this.selectedItem = obj
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChangeCallback: (_: any) => void = () => { };
  onTouchedCallback: () => void = () => { };

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
  }

  onClear(): void {
    this.loadData();
    this.emitSelectedValue(null);
  }

  onChange(selected: any): void {
    console.log('[CustomerSelectComponent] Selected Item:', selected);
    this.selectedItem = selected;
    this.emitSelectedValue(this.selectedItem);
    this.onChangeCallback(this.selectedItem);
  }

  private emitSelectedValue(value: any): void {
    this.change.emit(value);
  }
}
