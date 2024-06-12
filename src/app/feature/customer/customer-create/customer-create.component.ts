import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { FileHandle } from '@app/core/models/file-handle.model';
import { CustomerService } from '@app/core/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  addCustomerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    isActive: new FormControl(true, Validators.required),
    pic: new FormControl([]),
  });
  picFiles: File[] = []

  onSubmit() {
    if (this.addCustomerForm.invalid) {
      console.log("invalid form");
      FormHelper.markFormGroupTouched(this.addCustomerForm);
      return;
    }

    const formCustomer = this.prepareFormData(this.addCustomerForm.value);

    this.customerService.createCustomer(formCustomer).subscribe({
      next: (res: any) => {
        this.router.navigate(['/customer/list']);
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);

        switch (res.error.status) {
          case "VALIDATION ERROR": {
            for (let field in res.error.data) {
              const value = res.error.data[field];
              this.addCustomerForm.get(field)?.setErrors({ 'incorrect': { 'message': value } });
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
    const imageUrls = this.addCustomerForm.get('pic') as FormControl;

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

    const imageUrls = this.addCustomerForm.get('pic') as FormControl;
    const currentImages = imageUrls.value || [];

    const index = currentImages.findIndex(
      (fileHandle: FileHandle) => fileHandle.file === event
    );

    if (index !== -1) {
      currentImages.splice(index, 1);
      imageUrls.setValue(currentImages);
    }
  }

  prepareFormData(addCustomerForm2Value: any): FormData {
    const formData = new FormData();

    for (let key in addCustomerForm2Value) {
      const itemValue = addCustomerForm2Value[key]
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
