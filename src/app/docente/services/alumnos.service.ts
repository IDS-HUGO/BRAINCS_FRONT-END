import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = `${environment.apiUrl}alumnos/alumnos/grado/`;

  constructor(private http: HttpClient) { }

  getAlumnos(grado: number, grupo: string): Observable<any> {
    const url = `${this.apiUrl}${grado}/grupo/${grupo}`;
    return this.http.get<any[]>(url);
  }
}