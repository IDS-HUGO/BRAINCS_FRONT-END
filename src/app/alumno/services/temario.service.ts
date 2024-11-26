import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Temario } from '../models/temario';

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

    return this.http.get<Temario[]>(url).pipe(
      map((response) => {
        return response.map((temario) => {
          if (temario.documento_pdf) {
            // Verificar si ya es una URL completa
            if (!temario.documento_pdf.startsWith('http')) {
              temario.documento_pdf = `${environment.apiUrl}${temario.documento_pdf}`;
            }
          }
          return temario;
        });
      }),
      catchError((error) => {
        console.error('Error al obtener los temarios:', error);
        return throwError(() => new Error('No se pudieron obtener los temarios.'));
      })
    );
  }
}
