import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && (control.value.length < 8 || control.value.length > 15)) {
    return {password: true};
  }
  return null;
}
