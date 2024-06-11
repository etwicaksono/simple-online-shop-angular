import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  customer = {
    customer_name: '',
    customer_address: '',
    customer_code: '',
    customer_phone: '',
    is_active: true,
    last_order_date: '',
    pic: ''
  };

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted!', this.customer);
  }

  files: File[] = [];

  // on select file
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    const selectedFiles: File[] = event.addedFiles;
    const imageUrls = this.addRecipeForm.get('imageUrl') as FormControl;

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
    this.files.splice(this.files.indexOf(event), 1);

    const imageUrls = this.addRecipeForm.get('imageUrl') as FormControl;
    const currentImages = imageUrls.value || [];

    const index = currentImages.findIndex(
      (fileHandle: FileHandle) => fileHandle.file === event
    );

    if (index !== -1) {
      currentImages.splice(index, 1);
      imageUrls.setValue(currentImages);
    }
  }

  addRecipeForm: FormGroup = new FormGroup({
    recipeName: new FormControl('', Validators.required),
    categories: new FormGroup({
      categoryId: new FormControl(''),
      categoryName: new FormControl(''),
    }),
    levels: new FormGroup({
      levelId: new FormControl(''),
      levelName: new FormControl(''),
    }),
    userId: new FormControl('372'),
    timeCook: new FormControl('', Validators.required),
    ingridient: new FormControl('', Validators.required),
    howToCook: new FormControl('', Validators.required),
    imageUrl: new FormControl([]),
  });

  changeCategory(e: any) {
    console.log(e.target.value);
    const categoryId = e.target.value;
    let categoryName = '';

    switch (categoryId) {
      case '0':
        categoryName = 'Lunch';
        break;
      case '1':
        categoryName = 'Breakfast';
        break;
      case '2':
        categoryName = 'Dinner';
        break;
      case '3':
        categoryName = 'Snack';
        break;
      case '7':
        categoryName = 'Lunch';
        break;
      case '8':
        categoryName = 'Lunch';
        break;
      default:
        categoryName = '';
    }

    this.addRecipeForm.get('categories')?.setValue({
      categoryId: categoryId,
      categoryName: categoryName,
    });
  }

  changeLevel(e: any) {
    const levelId = e.target.value;
    let levelName = '';

    switch (levelId) {
      case '0':
        levelName = 'Master Chef';
        break;
      case '1':
        levelName = 'Hard';
        break;
      case '2':
        levelName = 'Medium';
        break;
      case '3':
        levelName = 'Easy';
        break;
      case '4':
        levelName = 'Master Chef';
        break;
      default:
        levelName = '';
    }

    this.addRecipeForm.get('levels')?.setValue({
      levelId: levelId,
      levelName: levelName,
    });
  }

  addRecipe() {
    console.log(this.addRecipeForm);

    const formRecipes = this.prepareFormData(this.addRecipeForm.value);

    this.customerService.createCustomer(formRecipes).subscribe(
      (res: any) => {
        this.router.navigate(['/daftar-resep']);
        // this.addRecipeForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(addRecipeForm2Value: any): FormData {
    const formData = new FormData();

    formData.append(
      'request',
      new Blob([JSON.stringify(addRecipeForm2Value)], {
        type: 'application/json',
      })
    );

    for (let i = 0; i < addRecipeForm2Value.imageUrl.length; i++) {
      formData.append(
        'file',
        addRecipeForm2Value.imageUrl[i].file,
        addRecipeForm2Value.imageUrl[i].file.name
      );
    }
    return formData;
  }
}
