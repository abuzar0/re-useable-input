import { AbstractControl, FormControl } from '@angular/forms';

export interface InputType {
  placeholder: string;
  type: string;
  id: number;
  controlName: string;
  labelName: string;
  
  // Validation properties
  validators?: {
    required?: { 
      isRequired: boolean; 
      message: string; 
    };
    pattern?: { 
      pattern: string; // Regex pattern
      message: string; 
    };
    custom?: { 
      validator: (control: AbstractControl) => { [key: string]: any } | null; 
      message: string; 
    };
  };
}
