import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '@app/core/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  detailCustomerForm: FormGroup
  customerId: number = 0
  imagePreview = ""

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
    this.customerId = Number(this.route.snapshot.paramMap.get('customerID'));
    this.detailCustomerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      isActive: new FormControl(true, Validators.required),
      pic: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem() {
    this.customerService.findCustomer(this.customerId).subscribe({
      next: (res: any) => {
        console.log("res.data: ", res.data);
        this.detailCustomerForm.get('name')?.setValue(res.data.name);
        this.detailCustomerForm.get('address')?.setValue(res.data.address);
        this.detailCustomerForm.get('code')?.setValue(res.data.code);
        this.detailCustomerForm.get('phone')?.setValue(res.data.phone);
        this.detailCustomerForm.get('isActive')?.setValue(res.data.isActive);
        this.imagePreview = res.data.pic
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);
      }
    })
  }
}
