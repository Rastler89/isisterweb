import { TestBed } from '@angular/core/testing';

import { IsisterService } from './isister.service';

describe('IsisterService', () => {
  let service: IsisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
