import { AbstractControl, ValidationErrors } from '@angular/forms';

export function blankValidator(control: AbstractControl): ValidationErrors | null {
  const re = /\s+/;
  const blanks = re.test(control.value);
  return blanks ? {blank: true} : null;
}
