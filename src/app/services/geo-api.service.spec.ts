import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {GeoApi} from './geo-api.service';
import {provideHttpClient} from '@angular/common/http';
import {RegionModel} from '../models/region.model';

describe('GeoApi', () => {
  let service: GeoApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(GeoApi);
      httpMock = TestBed.inject(HttpTestingController);
  });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch regions correctly from the API', () => {
      const mockRegions: RegionModel[] = [
          {code: '1', nom: 'Normandie', score: 10}
      ];
      const regionName = 'Normandie';

      service.searchRegion(regionName);
      const req = httpMock.expectOne(`https://geo.api.gouv.fr/regions?nom=${encodeURIComponent(regionName)}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockRegions);

      expect(service.regions()).toEqual(mockRegions);
    });
});
