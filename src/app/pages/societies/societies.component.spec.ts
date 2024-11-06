import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietiesComponent } from './societies.component';

describe('SocietiesComponent', () => {
  let component: SocietiesComponent;
  let fixture: ComponentFixture<SocietiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
