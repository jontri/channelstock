import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customEmailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value.trim()) {
    return null;
  }
  // tslint:disable-next-line:max-line-length
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = re.test(control.value.toLowerCase());
  return validEmail ? null : {customEmail: true};
}
