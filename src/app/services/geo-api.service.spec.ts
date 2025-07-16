import { TestBed } from '@angular/core/testing';

import { GeoApi } from './geo-api.service';

describe('GeoApiServiceService', () => {
  let service: GeoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
