import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Docente } from '../Models/docente.interface';
import { environment } from '../../../enviroment/enviroment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = `${environment.apiUrl}`; 
  private docenteAddedSubject = new Subject<void>();
  docenteAdded$ = this.docenteAddedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.apiUrl}docentes/docentes/`);
  }

  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${this.apiUrl}docentes/docentes/`, docente).pipe(
      tap(() => this.docenteAddedSubject.next())
    );
  }


  getDocenteById(id_docente: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}docentes/docentes/${id_docente}`);
  }

  updateDocente(docente: any, id_docente: number): Observable<Docente> {
    return this.http.put<Docente>(`${this.apiUrl}docentes/docentes/${id_docente}`, docente);
  }

  deleteDocente(id_docente: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}docentes/docentes/${id_docente}`);
  }
}
