import { TestBed } from '@angular/core/testing';

import { DogApiService } from './dog-api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MOCK_BREED_LIST_RESPONSE, MOCK_IMAGE_RESPONSE } from '../../../core/mocks/dog-api.mock';
import { environment } from '../../../../environments/environment';

describe('DogApiService', () => {
  let service: DogApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(DogApiService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return parsed breed list', () => {
    const mockData = MOCK_BREED_LIST_RESPONSE.message;

    service.getBreedsList()
      .subscribe(res => {
        expect(res.length).toBe(Object.keys(mockData).length);
        expect(res[0].name).toBe(Object.keys(mockData)[0]);
        expect(res[0].subBreeds).toEqual(Object.values(mockData)[0]);
      })

    const req = http.expectOne(environment.API_URL + 'breeds/list/all');
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  })

  it('should return a random image of a random breed', () => {
    const mockData = MOCK_IMAGE_RESPONSE.message;

    service.getRandomImage()
      .subscribe(res => {
        expect(res).toBeInstanceOf(String);
        expect(res).toBe(mockData);
      })

    const req = http.expectOne(environment.API_URL + 'breeds/image/random');
    expect(req.request.method).toBe('GET');
    req.flush(mockData)
  })

  it('should return a random image from a specific breed', () => {
    const mockData = MOCK_IMAGE_RESPONSE.message;
    const breed = 'hound-blood';

    service.getRandomImage(breed)
      .subscribe(res => {
        expect(res).toBeInstanceOf(String);
        expect(res).toBe(mockData);
      })

    const req = http.expectOne(environment.API_URL + `breed/${breed}/images/random`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData)
  })

  // TODO: move to interceptor's spec
  xit('should handle error when fetching breeds list', () => {
    service.getBreedsList().subscribe({
      next: () => fail('Should have thrown an error'),
      error: (err) => {
        expect(err).toBe('Error fetching breeds list');
      }
    });

    const req = http.expectOne(environment.API_URL + 'breeds/list/all');
    req.flush(null, { status: 500, statusText: 'Server Error' });
  });

  // TODO: move to interceptor's spec
  xit('should handle error when fetching images from invalid breeds', () => {
    service.getRandomImage('invalid-breed').subscribe({
      next: () => fail('Should have thrown an error'),
      error: (err) => {
        expect(err).toBe('Error fetching random image');
      }
    });

    const req = http.expectOne(environment.API_URL + `breed/invalid-breed/images/random`);
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });

  afterEach(() => {
    http.verify();
  })
});
