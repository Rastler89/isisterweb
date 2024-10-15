import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPublicComponent } from './medical-public.component';

describe('MedicalPublicComponent', () => {
  let component: MedicalPublicComponent;
  let fixture: ComponentFixture<MedicalPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
