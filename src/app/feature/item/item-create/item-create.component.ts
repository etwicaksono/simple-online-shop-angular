import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { FileHandle } from '@app/core/models/file-handle.model';
import { ItemService } from '@app/core/services/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css'
})
export class ItemCreateComponent {
  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  addItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    stock: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    isAvailable: new FormControl(true, Validators.required),
  });

  onSubmit() {
    if (this.addItemForm.invalid) {
      console.log("invalid form");
      FormHelper.markFormGroupTouched(this.addItemForm);
      return;
    }

    // Create the URL-encoded body
    let body = new HttpParams();
    let inputValue = this.addItemForm.value
    for (let key in inputValue) {
      if (inputValue.hasOwnProperty(key)) {
        body = body.set(key, inputValue[key]);
      }
    }

    this.itemService.createItem(body).subscribe({
      next: (res: any) => {
        this.router.navigate(['/item/list']);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);

        switch (res.error.status) {
          case "VALIDATION ERROR": {
            for (let field in res.error.data) {
              const value = res.error.data[field];
              this.addItemForm.get(field)?.setErrors({ 'incorrect': { 'message': value } });
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
