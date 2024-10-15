import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetVisitPublicComponent } from './vet-visit-public.component';

describe('VetVisitPublicComponent', () => {
  let component: VetVisitPublicComponent;
  let fixture: ComponentFixture<VetVisitPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetVisitPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VetVisitPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
