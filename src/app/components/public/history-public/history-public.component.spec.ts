import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPublicComponent } from './history-public.component';

describe('HistoryPublicComponent', () => {
  let component: HistoryPublicComponent;
  let fixture: ComponentFixture<HistoryPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
