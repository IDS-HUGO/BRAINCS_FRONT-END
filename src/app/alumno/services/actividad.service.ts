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
  
    return this.http.get<Actividad[]>(url).pipe(
      map((response) => {
        return response.map((actividad) => {
          if (actividad.contenido) {
            // Verifica si la ruta es relativa y asegura que solo quede la parte necesaria
            if (actividad.contenido.startsWith('static/')) {
              actividad.contenido = `${environment.apiUrl}${actividad.contenido}`;
            } else if (actividad.contenido.includes('/home/ubuntu/BRAINIACS_API/')) {
              // Elimina la parte innecesaria de la ruta
              actividad.contenido = actividad.contenido.replace('/home/ubuntu/BRAINIACS_API/', '');
            }
          }
          return actividad;
        });
        
      }),
      catchError(error => {
        console.error('Error al obtener actividades', error);
        return throwError(() => new Error('Error al obtener actividades'));
      })
    );
  }
  
  
}
