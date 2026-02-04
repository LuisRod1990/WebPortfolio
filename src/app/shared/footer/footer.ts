import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule], // 👈 importa aquí
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {}