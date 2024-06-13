import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { OrderService } from '@app/core/services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.css'
})
export class OrderEditComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editOrderForm = new FormGroup({
      customer: new FormControl(null, Validators.required),
      item: new FormControl(null, Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    });

    this.orderId = Number(this.route.snapshot.paramMap.get('orderID'));
  }

  existingOrder: any = null;
  selectedCustomer: any = null;
  selectedItem: any = null;
  editOrderForm: FormGroup
  orderId: number

  ngOnInit(): void {
    this.loadDetailOrder()

    this.editOrderForm.get('customer')?.valueChanges.subscribe((customer: any) => {
      this.selectedCustomer = customer;
    })
    this.editOrderForm.get('item')?.valueChanges.subscribe((item: any) => {
      this.selectedItem = item;
    })
  }

  loadDetailOrder() {
    this.orderService.findOrder(this.orderId).subscribe({
      next: (res: any) => {
        console.log('res: ', res)
        this.existingOrder = res.data
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);
      }
    })
  }


  onSubmit() {
    if (this.editOrderForm.invalid) {
      console.log("invalid form");
      FormHelper.markFormGroupTouched(this.editOrderForm);
      return;
    }

    // Create the URL-encoded body
    let inputValue = this.editOrderForm.value
    console.debug("inputValue: ", inputValue)
    let body = new HttpParams()
      .set("customerID", inputValue.customer.customerID)
      .set("itemsID", inputValue.item.itemsID)
      .set("quantity", inputValue.quantity);

    this.orderService.updateOrder(this.orderId, body).subscribe({
      next: (res: any) => {
        this.router.navigate(['/order/list']);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);

        switch (res.error.status) {
          case "VALIDATION ERROR": {
            for (let field in res.error.data) {
              const value = res.error.data[field];
              this.editOrderForm.get(field)?.setErrors({ 'incorrect': { 'message': value } });
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
