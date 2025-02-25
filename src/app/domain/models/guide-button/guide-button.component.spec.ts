import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideButtonComponent } from './guide-button.component';

describe('GuideButtonComponent', () => {
  let component: GuideButtonComponent;
  let fixture: ComponentFixture<GuideButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
