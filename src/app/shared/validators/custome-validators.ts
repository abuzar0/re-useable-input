import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static messageLength(control: AbstractControl): { [key: string]: any } | null {
    const isValid = control.value && control.value.length >= 10;
    return isValid ? null : { custom: true }; // Return custom error
  }
}
