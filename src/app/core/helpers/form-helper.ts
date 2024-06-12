import { FormGroup } from "@angular/forms";

export class FormHelper {
  public static markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        if (control) {
          control.markAsTouched();
        }
      }
    });
  }
}
