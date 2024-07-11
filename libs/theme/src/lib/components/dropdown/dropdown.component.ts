import { Component } from '@angular/core';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'theme-dropdown',
  imports: [NgbDropdownToggle, NgbDropdown, NgbDropdownMenu, NgbDropdownItem],
  template: `
    <div ngbDropdown class="d-inline-block">
      <button
        type="button"
        class="btn btn-outline-primary"
        id="dropdownBasic1"
        ngbDropdownToggle
      >
        Toggle dropdown
      </button>
      <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
        <button ngbDropdownItem>Action - 1</button>
        <button ngbDropdownItem>Another Action</button>
        <button ngbDropdownItem>Something else is here</button>
      </div>
    </div>
  `,
})
export class DropdownComponent {}
