import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MentionListDropdownComponent } from './mention-list-dropdown.component';

describe('MentionListDropdownComponent', () => {
  let component: MentionListDropdownComponent;
  let fixture: ComponentFixture<MentionListDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionListDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MentionListDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
