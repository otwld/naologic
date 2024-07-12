import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'lib-error-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-list.component.html',
})
export class ErrorListComponent {
  public readonly errors = input.required<ValidationErrors>();
}
