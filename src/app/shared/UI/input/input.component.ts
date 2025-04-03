import { Component, inject, Input, SkipSelf } from '@angular/core';
import { InputType } from '../../interface/input';
import {
  ControlContainer,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, 4),
      // SkipSelf = 4,
    },
  ],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  form!: FormGroup;

  @Input({ required: true, alias: 'field' }) inputDetails!: InputType;

  constructor(private control: ControlContainer) {
    this.form = this.control?.control as FormGroup;
    // console.log(this.form);
  }


  getErrorMessage(controlName: string): string {
  const control = this.form.get(controlName);
  if (!control || !control.errors) return '';

  // Debugging to check errors
  console.log(control.errors);

  // Iterate over error keys and return the first message found
  for (const errorKey of Object.keys(control.errors) as Array<keyof InputType['validators']>) {
    // Look for the errorKey in the InputType['validators']
    const validator = this.inputDetails.validators?.[errorKey] as any;
    

      // If it's the required validator, check if it's an error
      if (errorKey == 'required' && validator) {
        return validator.message; // Return message for required validation
      }

      // If it's a pattern validator, check if it's an error
      if (errorKey == 'pattern' && validator) {
        return validator.message; // Return message for pattern validation
      }

      // If it's a custom validator, check if it's an error
      if (errorKey == 'custom' && validator) {
        return validator.message; // Return message for custom validation
      }
    
  }

  return ''; // Default empty string if no message found
}


  // getErrorMessage(controlName: string): string {
  //   const control = this.form.get(controlName);
  //   if (!control || !control.errors) return '';
  
  //   console.log(control.errors); // Debugging to check errors
  
  //   // Iterate over error keys and return the first message found
  //   for (const errorKey of Object.keys(control.errors) as Array<keyof InputType['validators']>) {
  //     const validator = ;
  
  //     if (validator) {
  //       return validator.message; // Return first matching error message
  //     }
  //   }
  
  //   return ''; // Default empty string if no message found
  // }

 
  
}
