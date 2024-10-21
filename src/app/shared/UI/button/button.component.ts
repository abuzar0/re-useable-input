import { Component, Input } from '@angular/core';
import { ButtonType } from '../../interface/button-type';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() buttonInfo: Partial<ButtonType> | undefined;
  @Input() disable:boolean=false;
}
