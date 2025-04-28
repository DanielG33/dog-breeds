import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogoComponent } from './shared/components/logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    LogoComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
