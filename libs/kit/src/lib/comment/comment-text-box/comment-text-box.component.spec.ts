import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentTextBoxComponent } from './comment-text-box.component';

describe('CommentTextBoxComponent', () => {
  let component: CommentTextBoxComponent;
  let fixture: ComponentFixture<CommentTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentTextBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
