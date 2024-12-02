import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private getAlumnoByGradoGrupo = `${environment.apiUrl}alumnos/alumnos/grado/`;
  private apiUrl = `${environment.apiUrl}alumnos/alumnos/`;

  constructor(private http: HttpClient) { }

  createAlumno(alumno: Alumno): Observable<any> {
    return this.http.post<any>(this.apiUrl, alumno);
  }

  getAlumnos(grado: number, grupo: string): Observable<any> {
    const url = `${this.getAlumnoByGradoGrupo}${grado}/grupo/${grupo}`;
    return this.http.get<any[]>(url);
  }

  getAlumnoByMatricula(matricula: string): Observable<Alumno> {
    const url = `${this.apiUrl}${matricula}`;
    return this.http.get<Alumno>(url);
  }

  updateAlumnoByMatricula(matricula: string, alumno: Alumno): Observable<any> {
    const url = `${this.apiUrl}${matricula}`;
    return this.http.put<any>(url, alumno);
  }

  deleteAlumnoByMatricula(matricula: string): Observable<any> {
    const url = `${this.apiUrl}${matricula}`;
    return this.http.delete<any>(url);
  }  

}