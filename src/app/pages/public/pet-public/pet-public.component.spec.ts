import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPublicComponent } from './pet-public.component';

describe('PetPublicComponent', () => {
  let component: PetPublicComponent;
  let fixture: ComponentFixture<PetPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
