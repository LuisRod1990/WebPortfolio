// models/contacto.ts
export interface Contacto {
  usuarioid: number;
  usuario: string;
  nombre: string;
  apellidos: string;
  fechanacimiento: string;
  titulo: string;
  foto: string | null;
  cedula: string;
  rfc: string;
  curp: string;
  resumenperfil: string;
  email: string;
  celular: string;
  direccion: string;
}