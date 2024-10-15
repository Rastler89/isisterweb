import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalksPublicComponent } from './walks-public.component';

describe('WalksPublicComponent', () => {
  let component: WalksPublicComponent;
  let fixture: ComponentFixture<WalksPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalksPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalksPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
