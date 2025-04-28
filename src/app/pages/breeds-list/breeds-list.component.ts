import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DogApiService } from '../../shared/services/dog-api/dog-api.service';
import { Breed } from '../../core/models/breed.model';
import { TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BreedDetailsComponent } from '../../shared/components/breed-details/breed-details.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-breeds-list',
  imports: [
    MatListModule,
    TitleCasePipe
  ],
  templateUrl: './breeds-list.component.html',
  styleUrl: './breeds-list.component.scss'
})
export class BreedsListComponent implements OnInit {
  private readonly apiService = inject(DogApiService);
  private readonly dialog = inject(MatDialog)

  public breeds: Breed[] = [];
  public randomBreed!: { name: string, subName?: string, path: string[], image: string };

  ngOnInit(): void {
    this.getBreeds();
    this.getRandomBreed();
  }

  public async openBreedDialog(breed: string, subBreed?: string) {
    const image = await this.getRandomImage(breed, subBreed);

    const dialogRef = this.dialog.open(BreedDetailsComponent, {
      data: { breed, subBreed, image }
    });

    dialogRef.componentInstance.onRefresh.subscribe(async () => {
      dialogRef.componentInstance.data.image = await this.getRandomImage(breed, subBreed);
    })
  }

  private getBreeds() {
    this.apiService.getBreedsList()
      .subscribe(breeds => {
        this.breeds = breeds;
      })
  }

  private getRandomImage(breed: string, subBreed?: string): Promise<string> {
    let key = breed;
    if (subBreed)
      key += '/' + subBreed;

    return lastValueFrom(this.apiService.getRandomImage(key))
  }

  private getRandomBreed() {
    this.apiService.getRandomImage()
      .subscribe(url => {
        const breed = url.split('/')[4];
        const breedFragments = breed.split('-');

        this.randomBreed = {
          name: breedFragments[0],
          subName: breedFragments[1],
          path: breedFragments,
          image: url
        }
      })
  }
}
