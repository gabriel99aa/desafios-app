import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcomulatePointsComponent } from './acomulate-points.component';

describe('AcomulatePointsComponent', () => {
  let component: AcomulatePointsComponent;
  let fixture: ComponentFixture<AcomulatePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcomulatePointsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcomulatePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
