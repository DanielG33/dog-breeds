import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsComponent, BreedDialogData } from './breed-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BreedDetailsComponent', () => {
  let component: BreedDetailsComponent;
  let fixture: ComponentFixture<BreedDetailsComponent>;
  let debugElement: DebugElement;

  const mockDialogData: BreedDialogData = {
    breed: 'retriever',
    subBreed: 'golden',
    image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_472.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreedDetailsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render breed name in title case', () => {
    const titleElement: HTMLElement = debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(titleElement.textContent).toContain('Retriever');
  })

  it('should render sub-breed name in title case if exists', () => {
    const titleElement: HTMLElement = debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    expect(titleElement.textContent).toContain('Golden');
  })

  it('should NOT render sub-breed name if subBreed is not defined', () => {
    const noSubBreedData: BreedDialogData = {
      breed: 'retriever',
      image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_472.jpg'
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [BreedDetailsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: noSubBreedData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const subtitleElement = fixture.debugElement.query(By.css('mat-card-subtitle'));

    expect(subtitleElement).toBeFalsy();
  })

  it('should render image with correct src', () => {
    const imgElement: HTMLElement = debugElement.query(By.css('[mat-card-image]')).nativeElement;
    expect(imgElement.getAttribute('src')).toBe(mockDialogData.image);
  })

  it('should emit onRefresh() on refresh button click', () => {
    const btnElement = debugElement.query(By.css('.refresh-btn'));

    btnElement.triggerEventHandler('click', null);

    expect(component.onRefresh.emit).toHaveBeenCalled();
  })

});
