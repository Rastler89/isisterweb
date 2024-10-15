import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryPublicComponent } from './surgery-public.component';

describe('SurgeryPublicComponent', () => {
  let component: SurgeryPublicComponent;
  let fixture: ComponentFixture<SurgeryPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurgeryPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurgeryPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
