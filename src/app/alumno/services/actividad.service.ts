import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment';
import { Actividad } from '../models/actividad'; // Importa el modelo
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  private apiUrlGetActivitiesByGroupId: string = `${environment.apiUrl}actividad/actividades/`;

  constructor(private http: HttpClient) {}

  getActivitiesByGroupId(): Observable<Actividad[]> {
   const groupId = localStorage.getItem('id_grupo');
      if (!groupId) {
        console.error('ID de grupo no encontrado en localStorage');
        return throwError(() => new Error('ID de grupo no encontrado en localStorage'));
      }
    
      const url = `${this.apiUrlGetActivitiesByGroupId}${groupId}`;
      
      return this.http.get<Actividad | Actividad[]>(url).pipe(
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
