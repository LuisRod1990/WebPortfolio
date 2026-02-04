import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, DragDropModule,],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})

export class NavbarComponent {
  menuOpen = true; // por defecto visibles

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}