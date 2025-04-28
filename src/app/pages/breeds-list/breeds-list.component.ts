import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DogApiService } from '../../shared/services/dog-api/dog-api.service';
import { Breed } from '../../core/models/breed.model';
import { TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreedDetailsComponent } from '../../shared/components/breed-details/breed-details.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-breeds-list',
  imports: [
    MatListModule,
    TitleCasePipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './breeds-list.component.html',
  styleUrl: './breeds-list.component.scss'
})
export class BreedsListComponent implements OnInit {
  private readonly apiService = inject(DogApiService);
  private readonly dialog = inject(MatDialog)

  public filterInput = model('');
  private _breeds = signal<Breed[]>([]);
  public breeds = computed<Breed[]>(() =>
    this._breeds()
    .filter(breed =>
      [breed.name, ...breed.subBreeds].join(' ').includes(this.filterInput().toLowerCase().trim())
    )
  );

  public randomBreed!: { name: string, subName?: string, path: string[], image: string };

  ngOnInit(): void {
    this.getBreeds();
    this.getRandomBreed();
  }

  public clearFilter() {
    this.filterInput.set('');
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
        this._breeds.set([...breeds]);
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
