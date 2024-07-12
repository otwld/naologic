import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Input } from './input.types';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ErrorListComponent } from '../error-list/error-list.component';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTooltip, ErrorListComponent],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  public readonly control = input.required<FormControl<string>>();
  public readonly placeholder = input.required<Input['placeholder']>();
}
