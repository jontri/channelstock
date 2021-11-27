import { Directive } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
  selector: '[romPasswordValidation]'
})
export class PasswordValidationDirective {

  constructor() { }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('crmPassword').value; // to get value in input tag
    
    if(password !== confirmPassword) {
        AC.get('crmPassword').setErrors( {MatchPassword: true} )
    } else {
        return null
    }
  }
}
