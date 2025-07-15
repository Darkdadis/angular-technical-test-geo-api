import { TestBed } from '@angular/core/testing';

import { GeoApiServiceService } from './geo-api-service.service';

describe('GeoApiServiceService', () => {
  let service: GeoApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
