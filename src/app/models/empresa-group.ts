import   {ExperienciaLaboral} from '../models/experiencia-laboral'
export interface EmpresaGroup {
  empresa: string;
  puesto: string;
  proyectos: ExperienciaLaboral[];
  expanded: boolean;
  loadingExpand?: boolean;
}