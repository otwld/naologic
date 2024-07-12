import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule } from '@angular/forms';
import { SelectWithOptions } from './select-with-options.types';
import { ErrorListComponent } from '../error-list/error-list.component';

@Component({
  selector: 'lib-select-with-options',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    FormsModule,
    ErrorListComponent,
    NgbTooltip,
  ],
  templateUrl: './select-with-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWithOptionsComponent {
  public readonly control = input.required<FormControl>();
  public readonly options = input.required<SelectWithOptions['options']>();
  public readonly placeholder =
    input.required<SelectWithOptions['placeholder']>();

  openChange(open: boolean) {
    if (open) return;
    this.control().markAsTouched();
  }

  // TODO: Should be a Pipe or derived from a Signal
  toName(value: string) {
    return this.options().find((option) => option.value === value)?.name;
  }
}
