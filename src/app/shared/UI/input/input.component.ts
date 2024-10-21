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
    console.log(this.form);
  }

  // getErrorMessage(controlName: string): any {
  //   const control = this.form.get(controlName);
  //   console.log(control)
  //   if (control && control.errors) {
  //     for (const errorKey of Object.keys(control.errors) as Array<keyof InputType['validators']>) {
  //       const validator = this.inputDetails.validators?.[errorKey] as any;
        
  //       console.log(errorKey)
  //       // Ensure validator is defined before accessing its properties
  //       if (validator) {
  //         return validator.message; // Return the custom message
  //       }
  //     }
  //   }
    
  //   return '';
  // }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    
    if (control && control.errors) {
      for (const errorKey of Object.keys(control.errors) as Array<keyof InputType['validators']>) {
        const validator = this.inputDetails.validators?.[errorKey] as any;
  
        if (validator) {
          return validator.message; // Return the custom message
        }
      }
    }
    
    return '';
  }
}