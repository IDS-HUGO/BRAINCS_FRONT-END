import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagenResponse } from '../../../director/Models/usuario.interface';

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private readonly docenteUrl = 'https://apibrainiacs.brainiacs.site/docentes/docentes';
    private readonly alumnoUrl = 'https://apibrainiacs.brainiacs.site/alumnos/alumnos';
    public apiBaseUrl = 'https://apibrainiacs.brainiacs.site';

    constructor(private http: HttpClient) {}
  
    getDocente(idDocente: string): Observable<any> {
      return this.http.get(`${this.docenteUrl}/${idDocente}`);
    }
  
    getAlumno(matricula: string): Observable<any> {
      return this.http.get(`${this.alumnoUrl}/${matricula}`);
    }

    getImagenUsuario(usuarioId: string): Observable<ImagenResponse[]> {
        return this.http.get<ImagenResponse[]>(`${this.apiBaseUrl}/imagen_usuario/imagenes/${usuarioId}`);
      }
  }
  
