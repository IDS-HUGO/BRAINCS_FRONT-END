import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { environment } from '../../../enviroment/enviroment';
import { UsuarioResponse, ImagenResponse } from '../../director/Models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  public apiBaseUrl: string = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Alumno[]> {
    const grado = localStorage.getItem('grado');
    const grupo = localStorage.getItem('grupo');

    if (grado && grupo) {
      const url = `${this.apiBaseUrl}alumnos/alumnos/grado/${grado}/grupo/${grupo}`;
      return this.http.get<Alumno[]>(url);
    } else {
      throw new Error('Grado o grupo no encontrados en localStorage');
    }
  }

  getImagenUsuario(usuarioId: string): Observable<ImagenResponse[]> {
    return this.http.get<ImagenResponse[]>(`${this.apiBaseUrl}imagen_usuario/imagenes/${usuarioId}`);
  }


  getAlumnoByMatricula(matricula: string): Observable<Alumno> {
    if (!matricula) {
      throw new Error('La matrícula no puede estar vacía');
    }
    const url = `${this.apiBaseUrl}alumnos/alumnos/${matricula}`;
    return this.http.get<Alumno>(url);
  }
}
