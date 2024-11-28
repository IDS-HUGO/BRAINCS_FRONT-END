import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment';
import { Temario } from '../models/temario';

@Injectable({
  providedIn: 'root'
})
export class TemarioService {

  private apiUrlGetTemarios = `${environment.apiUrl}temario/grupo/`;
  private apiUrlEditTemario = `${environment.apiUrl}temario/`; // Endpoint de edición
  private apiUrlDeleteTemario = `${environment.apiUrl}temario/`; // Endpoint de eliminación
  private apiUrlAddTemario = `${environment.apiUrl}temario/`;  // Endpoint de agregar

  private apiUrlGetTemarioByGroupId: string = `${environment.apiUrl}temario/grupo/`;

  constructor(private http: HttpClient) { }


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

  getTemarios(idGrupo: number): Observable<any> {
    const url = `${this.apiUrlGetTemarios}${idGrupo}`;
    return this.http.get<any[]>(url);
  }

  updateTemario(temario: any, file: File | null): Observable<any> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('temario', JSON.stringify(temario)); // Añadir los datos del temario
    const url = `${this.apiUrlEditTemario}${temario.id}?id_grupo=${temario.idGrupo}`;
    return this.http.put(url, formData);
  }
  

  deleteTemario(temarioId: number): Observable<any> {
    const url = `${this.apiUrlDeleteTemario}${temarioId}`;
    return this.http.delete(url);
  }

  addTemario(temario: any): Observable<any> {
    return this.http.post(this.apiUrlAddTemario, temario);
  }
}
