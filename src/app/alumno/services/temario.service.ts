import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Temario } from '../models/temario';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TemarioService {
  private apiUrlGetTemarioByGroupId: string = `${environment.apiUrl}temario/grupo/`;

  constructor(private http: HttpClient) {}



getTemarioByGroupId(): Observable<Temario[]> {
  const groupId = localStorage.getItem('id_grupo');
  if (!groupId) {
    console.error('ID de grupo no encontrado en localStorage');
    return throwError(() => new Error('ID de grupo no encontrado en localStorage'));
  }

  const url = `${this.apiUrlGetTemarioByGroupId}${groupId}`;
  
  return this.http.get<Temario | Temario[]>(url).pipe(
    map((response) => {
      if (!Array.isArray(response)) {
        return Object.values(response); 
      }
      return response;
    }),
    catchError((error) => {
      console.error('Error al obtener los temarios:', error);
      return throwError(() => new Error('No se pudieron obtener los temarios.'));
    })
  );
}
}
