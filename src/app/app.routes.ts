import { Routes } from '@angular/router';
import { ContactoCard } from './components/contacto-card/contacto-card';
import { AptitudesCard } from './components/aptitudes-skills-card/aptitudes-skills-card';
import { ExperienciaLaboralCard } from './components/experiencia-laboral-card/experiencia-laboral-card';
export const routes: Routes = [
  { path: 'contacto', component: ContactoCard },
  { path: 'aptitudes', component: AptitudesCard },
  { path: 'experiencia', component: ExperienciaLaboralCard },
  { path: '', redirectTo: '/contacto', pathMatch: 'full' }
];