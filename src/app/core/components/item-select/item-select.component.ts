import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ItemService } from '@app/core/services/item.service';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrl: './item-select.component.css'
})
export class ItemSelectComponent {
  data: any[] = [];
  loading = false;

  @Output() change = new EventEmitter<any>();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(searchTerm: string = ''): void {
    this.loading = true;
    this.itemService.getItemForSelect(searchTerm).subscribe({
      next: (res) => {
        this.data = res?.data?.data;
        this.loading = false;
      },
      error: (res: HttpErrorResponse) => {
        console.error("getItemForSelect error: ", res);
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
    console.log('[ItemSelectComponent] Selected Item:', selected);
    this.emitSelectedValue(selected);
  }

  private emitSelectedValue(value: any): void {
    this.change.emit(value);
  }

}
