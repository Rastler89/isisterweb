import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPublicComponent } from './treatment-public.component';

describe('TreatmentPublicComponent', () => {
  let component: TreatmentPublicComponent;
  let fixture: ComponentFixture<TreatmentPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
