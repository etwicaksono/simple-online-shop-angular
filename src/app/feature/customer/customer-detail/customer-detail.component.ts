import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { FileHandle } from '@app/core/models/file-handle.model';
import { CustomerService } from '@app/core/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  // styleUrl: './customer-detail.component.css',
  styleUrls: ['./customer-detail.component.css', './../customer-list/customer-list.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  editCustomerForm: FormGroup
  customerId: number = 0
  imagePreview = ""

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerId = parseInt(this.route.snapshot.paramMap.get('customerID') || '0');
    this.editCustomerForm = new FormGroup({
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
        // this.editCustomerForm.patchValue(res.data);
        this.editCustomerForm.get('name')?.setValue(res.data.name);
        this.editCustomerForm.get('address')?.setValue(res.data.address);
        this.editCustomerForm.get('code')?.setValue(res.data.code);
        this.editCustomerForm.get('phone')?.setValue(res.data.phone);
        this.editCustomerForm.get('isActive')?.setValue(res.data.isActive);
        this.imagePreview = res.data.pic
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);
      }
    })
  }
}
