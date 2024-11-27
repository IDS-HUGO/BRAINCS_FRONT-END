export interface Docente {
  id_docente: number;
  usuario: string;
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  correo_electronico: string;
  contrasena: string;
}

export interface ImagenResponse {
  url_imagen: string;
}