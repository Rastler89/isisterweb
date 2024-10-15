import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesPublicComponent } from './allergies-public.component';

describe('AllergiesPublicComponent', () => {
  let component: AllergiesPublicComponent;
  let fixture: ComponentFixture<AllergiesPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllergiesPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllergiesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
