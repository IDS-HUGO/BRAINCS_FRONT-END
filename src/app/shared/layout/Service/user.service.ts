import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagenResponse } from '../../../director/Models/usuario.interface';
import { environment } from '../../../../enviroment/enviroment';

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private readonly docenteUrl = `${environment.apiUrl}docentes/docentes`;
    private readonly alumnoUrl = `${environment.apiUrl}alumnos/alumnos`;
    public apiBaseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}
  
    getDocente(idDocente: string): Observable<any> {
      return this.http.get(`${this.docenteUrl}/${idDocente}`);
    }
  
    getAlumno(matricula: string): Observable<any> {
      return this.http.get(`${this.alumnoUrl}/${matricula}`);
    }

    getImagenUsuario(usuarioId: string): Observable<ImagenResponse[]> {
        console.log("Imgen del usuario docente fallido: ",`${this.apiBaseUrl}imagen_usuario/imagenes/${usuarioId}`)
        return this.http.get<ImagenResponse[]>(`${this.apiBaseUrl}imagen_usuario/imagenes/${usuarioId}`);
      }
  }
  