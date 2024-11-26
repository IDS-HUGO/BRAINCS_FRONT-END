import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
 private apiUrlGetGroupById: string = `${environment.apiUrl}alumnos/alumnos/grado`;

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Alumno[]> {
    const grado = localStorage.getItem('grado'); 
    const grupo = localStorage.getItem('grupo'); 

    if (grado && grupo) {
      const url = `${this.apiUrlGetGroupById}/${grado}/grupo/${grupo}`;
      return this.http.get<Alumno[]>(url);  
    } else {
      throw new Error('Grado o grupo no encontrados en localStorage');
    }
  }
}
