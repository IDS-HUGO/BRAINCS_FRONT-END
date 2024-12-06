import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagenResponse } from '../../../director/Models/usuario.interface';
import { environment } from '../../../../enviroment/enviroment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private readonly docenteUrl = `${environment.apiUrl}docentes/docentes`;
    private readonly alumnoUrl = `${environment.apiUrl}alumnos/alumnos`;
    private readonly directorUrl = `${environment.apiUrl}directores/directores`;
    public apiBaseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}
  
    getDocente(idDocente: string): Observable<any> {
      return this.http.get(`${this.docenteUrl}/${idDocente}`);
    }
  
    getAlumno(matricula: string): Observable<any> {
      return this.http.get(`${this.alumnoUrl}/${matricula}`);
    }

    getDirector(idDirector: number): Observable<any> {
      return this.http.get(`${this.directorUrl}/${idDirector}`);
    }

    getImagenUsuario(usuarioId: string): Observable<ImagenResponse[]> {
        console.log("Imgen del usuario docente fallido: ",`${this.apiBaseUrl}imagen_usuario/imagenes/${usuarioId}`)
        return this.http.get<ImagenResponse[]>(`${this.apiBaseUrl}imagen_usuario/imagenes/${usuarioId}`);
      }

      uploadUserImage(usuarioId: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
    
        const url = `${this.apiBaseUrl}imagen_usuario/upload-imagen/?usuario_id=${usuarioId}`;
        return this.http.post(url, formData, {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
        });
      }

      deleteUserImage(usuarioId: string): Observable<any> {
        const url = `${this.apiBaseUrl}imagen_usuario/imagen_usuario/${usuarioId}`;
        return this.http.delete(url, {
          headers: new HttpHeaders({
            'Accept': 'application/json',
          }),
        });
      }
      
  }
  
