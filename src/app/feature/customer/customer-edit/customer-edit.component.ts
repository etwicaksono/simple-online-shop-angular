import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { FileHandle } from '@app/core/models/file-handle.model';
import { CustomerService } from '@app/core/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {
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

  picFiles: File[] = []

  onSubmit() {
    if (this.editCustomerForm.invalid) {
      console.log("invalid form");
      FormHelper.markFormGroupTouched(this.editCustomerForm);
      return;
    }

    const formCustomer = this.prepareFormData(this.editCustomerForm.value);

    this.customerService.updateCustomer(this.customerId, formCustomer).subscribe({
      next: (res: any) => {
        this.router.navigate(['/customer/list']);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);

        switch (res.error.status) {
          case "VALIDATION ERROR": {
            for (let field in res.error.data) {
              const value = res.error.data[field];
              this.editCustomerForm.get(field)?.setErrors({ 'incorrect': { 'message': value } });
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

  // on select file
  onSelect(event: any) {
    console.log(event);
    this.picFiles.push(...event.addedFiles);
    const selectedFiles: File[] = event.addedFiles;
    const imageUrls = this.editCustomerForm.get('pic') as FormControl;

    const currentImages = imageUrls.value || [];

    for (const file of selectedFiles) {
      const fileHandle: FileHandle = {
        file: file,
      };
      currentImages.push(fileHandle);
    }

    imageUrls.setValue(currentImages);
  }

  // on remove file
  onRemove(event: any) {
    console.log(event);
    this.picFiles.splice(this.picFiles.indexOf(event), 1);

    const imageUrls = this.editCustomerForm.get('pic') as FormControl;
    const currentImages = imageUrls.value || [];

    const index = currentImages.findIndex(
      (fileHandle: FileHandle) => fileHandle.file === event
    );

    if (index !== -1) {
      currentImages.splice(index, 1);
      imageUrls.setValue(currentImages);
    }
  }

  prepareFormData(editCustomerForm2Value: any): FormData {
    const formData = new FormData();

    for (let key in editCustomerForm2Value) {
      const itemValue = editCustomerForm2Value[key]
      if (key == "pic") {
        itemValue.forEach((fileItem: FileHandle) => {
          formData.append(key, fileItem.file, fileItem.file.name)
        })
      } else {
        formData.append(key, itemValue)
      }
    }


    return formData;
  }
}
