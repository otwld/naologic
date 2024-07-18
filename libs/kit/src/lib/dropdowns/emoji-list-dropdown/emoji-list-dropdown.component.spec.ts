import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmojiListDropdownComponent } from './emoji-list-dropdown.component';

describe('EmojiListDropdownComponent', () => {
  let component: EmojiListDropdownComponent;
  let fixture: ComponentFixture<EmojiListDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiListDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmojiListDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
