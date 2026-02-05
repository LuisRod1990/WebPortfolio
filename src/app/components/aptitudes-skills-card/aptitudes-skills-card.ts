import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data';
import { Aptitud } from '../../models/aptitud';
import { Skill } from '../../models/skills';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth';
import { Loading } from '../../shared/loading/loading';
import { Experiencia } from '../../models/experiencia-total';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-aptitudes-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, Loading, DragDropModule],
  templateUrl: './aptitudes-skills-card.html',
  styleUrls: ['./aptitudes-skills-card.scss']
})
export class AptitudesCard implements OnInit, OnDestroy {
  aptitudes: Aptitud[] = [];
  skills: Skill[] = [];
  token: string | null = null;
  refreshToken: string | null = null;
  loading: boolean = false;
  experiencias: Experiencia[] = [];

  menuOpen = false; // por defecto visibles

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Layout actual
  selectedLayout: 'two-top-one-bottom' | 'two-columns' | 'two-right-one-left' = 'two-top-one-bottom';

  // 👇 Configuración del carrusel
  groupSize: number = 1; // cuántos skills mostrar a la vez
  currentIndex: number = 0;
  intervalId: any;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private storage: StorageService
  ) {}

  // Dentro de AptitudesCard
  isDarkTheme: boolean = false;

  toggleTheme() {
  this.isDarkTheme = !this.isDarkTheme;
  }

  ngOnInit(): void {
    this.loginAndLoadData();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  // Cambiar layout dinámicamente
  changeLayout(layout: 'two-top-one-bottom' | 'two-columns' | 'two-right-one-left') {
    this.selectedLayout = layout;
    this.cd.detectChanges();
  }

  private loginAndLoadData(): void {
    this.loading = true;
    this.authService.login({
      username: 'luisrodj1990@gmail.com',
      password: 'MiPasswordSegura123'
    })
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: res => {
        this.token = res.accessToken;
        this.refreshToken = res.refreshToken;
        this.storage.set('token', this.token);
        this.storage.set('refreshToken', this.refreshToken);
        this.getAptitudes();
        this.getSkills();
        this.getExperiencias();
      },
      error: err => {
        console.error('Error en login:', err);
      }
    });
  }

  private getAptitudes(): void {
    this.loading = true;
    this.dataService.getAptitudes(1)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: Aptitud[]) => {
          this.aptitudes = data;
          this.cd.detectChanges();
        },
        error: err => {
          console.error('Error al cargar aptitudes:', err);
          if (err.status === 401) this.onRefresh();
        }
      });
  }

  private getSkills(): void {
    this.loading = true;
    this.dataService.getSkills(1)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: Skill[]) => {
          this.skills = data;
          this.cd.detectChanges();
          this.startRotation(); // 👈 iniciamos la rotación automática
        },
        error: err => {
          console.error('Error al cargar skills:', err);
          if (err.status === 401) this.onRefresh();
        }
      });
  }

  private startRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + this.groupSize) % this.skills.length;
      this.cd.detectChanges();
    }, 3000); // cada 3 segundos rota
  }

  get visibleSkills(): Skill[] {
    return this.skills.slice(this.currentIndex, this.currentIndex + this.groupSize);
  }
  
  private getExperiencias(): void {
    this.loading = true;
    this.dataService.getExperiencias(1)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: Experiencia[]) => {
          this.experiencias = data;
          this.cd.detectChanges();
        },
        error: err => {
          console.error('Error al cargar experiencias:', err);
          if (err.status === 401) this.onRefresh();
        }
      });
  }


  private onRefresh(): void {
    this.loading = true;
    this.authService.refreshToken()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next:  (res) => {
          this.token = res.accessToken;
          this.storage.set('token', this.token);
          this.getAptitudes();
          this.getSkills();
          this.getExperiencias();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error en refresh:', err);
        }
      });
  }
}