import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { CustomerService } from '@app/core/services/customer.service';
import { OrderService } from '@app/core/services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent {
  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  addOrderForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    stock: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    isAvailable: new FormControl(true, Validators.required),
  });

  onSubmit() {
    if (this.addOrderForm.invalid) {
      console.log("invalid form");
      FormHelper.markFormGroupTouched(this.addOrderForm);
      return;
    }

    // Create the URL-encoded body
    let body = new HttpParams();
    let inputValue = this.addOrderForm.value
    for (let key in inputValue) {
      if (inputValue.hasOwnProperty(key)) {
        body = body.set(key, inputValue[key]);
      }
    }

    this.orderService.createOrder(body).subscribe({
      next: (res: any) => {
        this.router.navigate(['/order/list']);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);

        switch (res.error.status) {
          case "VALIDATION ERROR": {
            for (let field in res.error.data) {
              const value = res.error.data[field];
              this.addOrderForm.get(field)?.setErrors({ 'incorrect': { 'message': value } });
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
