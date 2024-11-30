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
  private addAlumno = `${environment.apiUrl}alumnos/alumnos/`;

  constructor(private http: HttpClient) { }

  getAlumnos(grado: number, grupo: string): Observable<any> {
    const url = `${this.getAlumnoByGradoGrupo}${grado}/grupo/${grupo}`;
    return this.http.get<any[]>(url);
  }

  createAlumno(alumno: Alumno): Observable<any> {
    return this.http.post<any>(this.addAlumno, alumno);
  }
}