import { Component, ElementRef, Signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-comment-text-box-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-text-box-toolbar.component.html',
})
export class CommentTextBoxToolbarComponent {
  private readonly toolbar: Signal<ElementRef<HTMLElement>> =
    viewChild.required('toolbar');
}
