import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importa tus componentes standalone
import { NavbarComponent } from './shared/navbar/navbar';

// Importa Angular Material que uses en AppComponent (ej. toolbar, card, button)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}