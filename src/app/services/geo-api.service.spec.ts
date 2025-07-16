import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GeoApi } from './geo-api.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('GeoApi', () => {
  let service: GeoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        HttpClient,
        HttpHandler,
      ]
    });
    service = TestBed.inject(GeoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
