import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { ItemService } from '@app/core/services/item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})
export class ItemEditComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemId = Number(this.route.snapshot.paramMap.get('itemID'));
  }
  ngOnInit(): void {
    this.loadItem();
  }

  editItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    stock: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    isAvailable: new FormControl(true, Validators.required),
  });
  itemId: number

  loadItem() {
    this.itemService.findItem(this.itemId).subscribe({
      next: (res: any) => {
        console.log("res: ", res)
        this.editItemForm.get('name')?.setValue(res.data.itemsName);
        this.editItemForm.get('code')?.setValue(res.data.itemsCode);
        this.editItemForm.get('stock')?.setValue(res.data.stock);
        this.editItemForm.get('price')?.setValue(res.data.price);
        this.editItemForm.get('isAvailable')?.setValue(res.data.isAvailable);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);
      }
    })
  }

  onSubmit() {
    if (this.editItemForm.invalid) {
      console.log("invalid form");
      FormHelper.markFormGroupTouched(this.editItemForm);
      return;
    }

    // Create the URL-encoded body
    let body = new HttpParams();
    let inputValue = this.editItemForm.value
    for (let key in inputValue) {
      if (inputValue.hasOwnProperty(key)) {
        body = body.set(key, inputValue[key]);
      }
    }

    this.itemService.updateItem(this.itemId, body).subscribe({
      next: (res: any) => {
        this.router.navigate(['/item/list']);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);

        switch (res.error.status) {
          case "VALIDATION ERROR": {
            for (let field in res.error.data) {
              const value = res.error.data[field];
              this.editItemForm.get(field)?.setErrors({ 'incorrect': { 'message': value } });
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

}
