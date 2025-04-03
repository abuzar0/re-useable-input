import { Component } from '@angular/core';
import { LabelComponent } from '../shared/UI/label/label.component';
import { InputComponent } from '../shared/UI/input/input.component';
import { ButtonComponent } from '../shared/UI/button/button.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputType } from '../shared/interface/input';
import { CustomValidators } from '../shared/validators/custome-validators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    LabelComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  form!: FormGroup;
  fields: InputType[] = [
    {
      id: 1,
      labelName: 'name',
      type: 'text',
      placeholder: 'enter name',
      controlName: 'name',
      validators: {
        required: { isRequired: true, message: 'name required' },
      },
    },
    {
      id: 2,
      labelName: 'email',
      type: 'email',
      placeholder: 'enter email',
      controlName: 'email',
      validators: {
        required: { isRequired: true, message: 'email required' },
        pattern: {
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          message: 'email is not valid',
        },
      },
    },
    {
      id: 3,
      labelName: 'message',
      type: 'textarea',
      placeholder: 'enter message',
      controlName: 'message',
      validators: {
        required: { isRequired: true, message: 'message required' },
        custom: {
          validator: CustomValidators.messageLength,
          message: 'message must be 10 length',
        },
      },
    },
  ];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.fields.forEach((field) => {
      const controlValidators = [];

      if (field.validators) {
        // Required Validator
        if (field.validators.required?.isRequired) {
          controlValidators.push(Validators.required);
        }

        // Pattern Validator
        if (field.validators.pattern) {
          controlValidators.push(
            Validators.pattern(new RegExp(field.validators.pattern.pattern))
          );
        }

        // Custom Validator
        if (field.validators.custom) {
          controlValidators.push(field.validators.custom.validator);
        }
      }

      this.form.addControl(
        field.controlName,
        new FormControl('', controlValidators)
      );
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
