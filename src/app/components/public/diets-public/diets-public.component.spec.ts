import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietsPublicComponent } from './diets-public.component';

describe('DietsPublicComponent', () => {
  let component: DietsPublicComponent;
  let fixture: ComponentFixture<DietsPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietsPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
