import { TestBed } from '@angular/core/testing';

import { NewlocationService } from './newlocation.service';

describe('NewlocationService', () => {
  let service: NewlocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewlocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
