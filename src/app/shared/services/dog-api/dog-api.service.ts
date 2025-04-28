import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BreedImageApiResponse, BreedListApiResponse } from '../../../core/models/dog-api.model';
import { Breed } from '../../../core/models/breed.model';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {

  private readonly http = inject(HttpClient);

  public getBreedsList(): Observable<Breed[]> {
    return this.http.get<BreedListApiResponse>(environment.API_URL + 'breeds/list/all')
      .pipe(
        map(res => {
          return Object.entries(res.message).map(([key, val]) => ({
            name: key,
            subBreeds: val
          }))
        }),
        catchError(error => {
          console.error('Error fetching breeds list: ', error)
          return throwError(() => 'Error fetching breeds list')
        })
      )
  }

  public getRandomImage(breed?: string): Observable<string> {
    const path = breed ? `breed/${breed}/images/random` : 'breeds/image/random';

    return this.http.get<BreedImageApiResponse>(environment.API_URL + path)
      .pipe(
        map(res => {
          return res.message;
        }),
        catchError(error => {
          console.error('Error fetching random image: ', error)
          return throwError(() => 'Error fetching random image')
        })
      )
  }
}
