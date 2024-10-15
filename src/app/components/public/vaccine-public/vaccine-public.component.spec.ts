import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinePublicComponent } from './vaccine-public.component';

describe('VaccinePublicComponent', () => {
  let component: VaccinePublicComponent;
  let fixture: ComponentFixture<VaccinePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccinePublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccinePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
