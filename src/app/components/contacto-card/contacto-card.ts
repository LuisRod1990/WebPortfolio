import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, CommonModule } from '@angular/common'; 
import { Contacto } from '../../models/contacto';
import { DataService } from '../../services/data';
import { AuthService } from '../../services/auth';
import { Loading } from '../../shared/loading/loading';
import { finalize } from 'rxjs/operators';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-contacto-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, DatePipe, Loading, DragDropModule],
  templateUrl: './contacto-card.html',
  styleUrls: ['./contacto-card.scss'],
})
export class ContactoCard implements OnInit {
  contacto!: Contacto;
  token: string | null = null;
  refreshToken: string | null = null;
  loading: boolean = false; 

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private storage: StorageService
  ) {}
  
  ngOnInit(): void {
    this.loginAndLoadContacto();
  }

  private loginAndLoadContacto(): void {
    this.loading = true; 
    this.authService.login({
      username: 'luisrodj1990@gmail.com',
      password: 'MiPasswordSegura123'
    })
    .pipe(
      finalize(() => this.loading = false) // 👈 siempre se ejecuta al terminar
    )
    .subscribe({
      next: res => {
        this.token = res.accessToken;
        this.refreshToken = res.refreshToken;

        // Guardamos en localStorage para que el interceptor lo use
        this.storage.set('token', this.token);
        this.storage.set('refreshToken', this.refreshToken);
        
        // Ahora sí, cargamos el contacto
        this.getContacto();
      },
      error: err => {
        console.error('Error en login:', err);
      }
    });
  }

  private getContacto(): void {
    this.loading = true;

    this.dataService.getContacto(1)
      .pipe(
        finalize(() => this.loading = false) // 👈 siempre se ejecuta al terminar
      )
      .subscribe({
        next: (data: Contacto[]) => {
          this.contacto = data[0]; // tu API devuelve un array
          this.cd.detectChanges();
        },
        error: err => {
          console.error('Error al cargar contacto:', err);

          if (err.status === 401) {
            this.onRefresh();
          }
        }
      });
  }

  private onRefresh(): void {
    this.loading = true;

    this.authService.refreshToken()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: res => {
          this.token = res.accessToken;
          this.storage.set('token', this.token);
          this.getContacto();
        },
        error: err => {
          console.error('Error en refresh:', err);
        }
      });
  }
}