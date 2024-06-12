import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '@app/core/services/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
  }

  detailItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    stock: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    isAvailable: new FormControl(true, Validators.required),
  });
  itemId: number


  ngOnInit(): void {
    this.loadItem();
  }

  loadItem() {
    this.itemService.findItem(this.itemId).subscribe({
      next: (res: any) => {
        this.detailItemForm.get('name')?.setValue(res.data.itemsName);
        this.detailItemForm.get('code')?.setValue(res.data.itemsCode);
        this.detailItemForm.get('stock')?.setValue(res.data.stock);
        this.detailItemForm.get('price')?.setValue(res.data.price);
        this.detailItemForm.get('isAvailable')?.setValue(res.data.isAvailable);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);
      }
    })
  }
}
