import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../Models/docente.interface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = 'https://apibrainiacs.brainiacs.site/docentes/docentes';

  constructor(private http: HttpClient) {}

  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.apiUrl);
  }

  getDocente(id_docente: string): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}/${id_docente}`);
  }

  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(this.apiUrl, docente);
  }

  updateDocente(id_docente: string, docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.apiUrl}/${id_docente}`, docente);
  }

  deleteDocente(id_docente: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_docente}`);
  }
}
