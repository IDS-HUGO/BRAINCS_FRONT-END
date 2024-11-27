import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../Models/docente.interface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = 'https://apibrainiacs.brainiacs.site';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    })
  };

  constructor(private http: HttpClient) {}

  addDocente(docente: Docente): Observable<any> {
    return this.http.post(`${this.apiUrl}/docentes/docentes/`, docente, this.httpOptions);
  }

  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.apiUrl}/docentes/docentes/`, this.httpOptions);
  }

  deleteDocente(id_docente: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/docentes/docentes/${id_docente}`, this.httpOptions);
  }

  getDocenteById(id_docente: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}/docentes/docentes/${id_docente}`, this.httpOptions);
  }

  updateDocente(id_docente: number, docente: Docente): Observable<any> {
    return this.http.put(`${this.apiUrl}/docentes/docentes/${id_docente}`, docente, this.httpOptions);
  }
}
