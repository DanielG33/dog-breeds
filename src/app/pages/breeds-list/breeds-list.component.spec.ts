import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedsListComponent } from './breeds-list.component';
import { DogApiService } from '../../shared/services/dog-api/dog-api.service';
import { DogApiServiceSpyObj, MOCK_BREEDS } from '../../core/mocks/dog-api.mock';
import { of } from 'rxjs';
import { Breed } from '../../core/models/breed.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BreedsListComponent', () => {
  let component: BreedsListComponent;
  let fixture: ComponentFixture<BreedsListComponent>;
  let debugElement: DebugElement;
  let mockDogApiService: jasmine.SpyObj<DogApiService>;
  let mockBreeds: Breed[];
  let mockImage: string;

  beforeEach(async () => {
    mockDogApiService = DogApiServiceSpyObj

    await TestBed.configureTestingModule({
      imports: [BreedsListComponent],
      providers: [
        { provide: DogApiService, useValue: mockDogApiService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedsListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(() => {
    mockBreeds = MOCK_BREEDS;
    mockImage = 'https://images.dog.ceo/breeds/hound-blood/n02088466_2030.jpg';

    mockDogApiService.getBreedsList.and.returnValue(of(mockBreeds));
    mockDogApiService.getRandomImage.and.returnValue(of(mockImage));

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set breeds list on init', () => {
    expect(mockDogApiService.getBreedsList).toHaveBeenCalled();
    expect(component.breeds).toEqual(mockBreeds);
  });

  it('should fetch a random image and set randomBreed on init', () => {
    expect(mockDogApiService.getRandomImage).toHaveBeenCalled();
    expect(component.randomBreed).toEqual({
      name: 'hound',
      subName: 'blood',
      path: ['hound', 'blood'],
      image: mockImage
    });
  })

  it('should render the list of breeds and sub-breeds', () => {
    const breedElements = debugElement.queryAll(By.css('.breed-item'));
    const subBreedElements = debugElement.queryAll(By.css('.subBreed-item'));
    const subBreeds = mockBreeds.reduce((acc: string[], val) => {
      return acc.concat(val.subBreeds);
    }, [])

    expect(breedElements.length).toBe(component.breeds.length);
    expect(subBreedElements.length).toBe(subBreeds.length);
  });

  it('should render random breed image and name', () => {
    const imgElement = debugElement.query(By.css('.dog-image'));
    const breedNameElement = debugElement.query(By.css('.dog-breed'));
    const subBreedNaneElement = debugElement.query(By.css('.dog-subBreed'));

    expect(imgElement).toBeTruthy();
    expect((<HTMLElement>imgElement.nativeElement).getAttribute('src')).toBe(mockImage);
    expect((<HTMLElement>breedNameElement.nativeElement).textContent?.toLowerCase()).toContain(component.randomBreed.name);
    expect((<HTMLElement>subBreedNaneElement.nativeElement).textContent?.toLowerCase()).toContain(component.randomBreed.subName);
  });
});
