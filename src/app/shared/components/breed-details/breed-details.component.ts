import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

export interface BreedDialogData {
  breed: string,
  subBreed?: string,
  image: string,
}

@Component({
  selector: 'app-breed-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    TitleCasePipe
  ],
  templateUrl: './breed-details.component.html',
  styleUrl: './breed-details.component.scss'
})
export class BreedDetailsComponent {
  public readonly data = inject<BreedDialogData>(MAT_DIALOG_DATA);
  public readonly onRefresh = new EventEmitter();

  public emitRefresh() {
    this.onRefresh.emit();
  }
}
