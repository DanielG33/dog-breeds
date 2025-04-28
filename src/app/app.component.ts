import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoComponent } from './shared/components/logo/logo.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    LogoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dog-breeds';
}
