import { ExperienciaLaboral } from '../../models/experiencia-laboral';
import { DataService } from '../../services/data';
import { AuthService } from '../../services/auth'; // 👈 importa AuthService
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DatePipe, CommonModule } from '@angular/common';
import { Loading } from '../../shared/loading/loading'; // 👈 importa tu componente de loading
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmpresaGroup } from '../../models/empresa-group'
@Component({
  selector: 'app-experiencia-laboral-card',
  standalone: true,
  imports: [DatePipe, CommonModule, Loading, MatTooltipModule], // 👈 agrega Loading aquí
  templateUrl: './experiencia-laboral-card.html',
  styleUrls: ['./experiencia-laboral-card.scss'],
})
export class ExperienciaLaboralCard implements OnInit {
  experienciasLaborales: ExperienciaLaboral[] = [];
  empresasAgrupadas: EmpresaGroup[] = [];
  loading: boolean = false;
  currentIndex: number = 0;

  token: string | null = null;
  refreshToken: string | null = null;

  constructor(
    private dataService: DataService,
    private authService: AuthService, // 👈 inyecta AuthService
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginAndLoadExperiencias();
  }

  private loginAndLoadExperiencias(): void {
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

        localStorage.setItem('token', this.token);
        localStorage.setItem('refreshToken', this.refreshToken);

        this.getExperienciasLaborales();
      },
      error: err => {
        console.error('Error en login:', err);
      }
    });
  }

  private getExperienciasLaborales(): void {
    this.loading = true;
    this.dataService.getExperienciaLaboral(1)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: ExperienciaLaboral[]) => {
          this.experienciasLaborales = data;
          this.empresasAgrupadas = this.groupByEmpresa(data);
          this.cd.detectChanges();
        },
        error: err => {
          console.error('Error al cargar experiencias laborales:', err);

          if (err.status === 401) {
            this.onRefresh();
          }
        }
      });
  }

  private onRefresh(): void {
    this.loading = true;
    this.authService.refreshToken()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.token = res.accessToken;
          localStorage.setItem('token', this.token);
          this.getExperienciasLaborales();
        },
        error: err => {
          console.error('Error en refresh:', err);
        }
      });
  }

  private groupByEmpresa(data: ExperienciaLaboral[]): EmpresaGroup[] {
    const grupos: { [key: string]: EmpresaGroup } = {};
    data.forEach(exp => {
      if (!grupos[exp.empresa]) {
        grupos[exp.empresa] = {
          empresa: exp.empresa,
          puesto: exp.puesto,
          proyectos: [],
          expanded: false
        };
      }
      grupos[exp.empresa].proyectos.push(exp);
    });
    return Object.values(grupos);
  }

  get visibleEmpresas(): EmpresaGroup[] {
    return this.empresasAgrupadas.slice(this.currentIndex, this.currentIndex + 3);
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 3;
    }
  }

  next(): void {
    if (this.currentIndex + 3 < this.empresasAgrupadas.length) {
      this.currentIndex += 3;
    }
  }

  toggleExpand(group: EmpresaGroup): void {
    group.loadingExpand = true; // 👈 activa loading

    // Simula carga de datos o animación
    setTimeout(() => {
      group.expanded = !group.expanded;
      group.loadingExpand = false; // 👈 desactiva loading
      this.cd.detectChanges();
    }, 600); // medio segundo de "loading"
  }
}