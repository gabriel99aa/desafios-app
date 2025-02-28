import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBigCardComponent } from './vertical-card.component';

describe('VerticalCardComponent', () => {
  let component: VerticalBigCardComponent;
  let fixture: ComponentFixture<VerticalBigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalBigCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalBigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
