import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectWithOptionsComponent } from './select-with-options.component';
import { FormControl } from '@angular/forms';

describe('SelectWithOptionsComponent', () => {
  let component: SelectWithOptionsComponent;
  let fixture: ComponentFixture<SelectWithOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectWithOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectWithOptionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('control', new FormControl());
    fixture.componentRef.setInput('placeholder', 'Select an option');
    fixture.componentRef.setInput('options', [
      { value: '1', name: 'Option 1' },
      { value: '2', name: 'Option 2' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value and map to name', () => {
    component.control().setValue('2');
    component.control().updateValueAndValidity();
    // Expect control value to be '2'
    expect(component.control().value).toBe('2');
    expect(component.toName('2')).toBe('Option 2');
  });
});
