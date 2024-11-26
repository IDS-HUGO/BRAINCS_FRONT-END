import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root',
})export class GruposService {
  private apiUrlGetGroupByGradoGrupo: string = `${environment.apiUrl}grupos/grupos/by-grado-grupo`;

  constructor(private http: HttpClient) {}

  // Método para obtener los grupos basados en el grado y grupo del localStorage
  getGroupsByGradoGrupo(grado: number, grupo:string): Observable<Grupo[]> {


    if (grado && grupo) {
      const url = `${this.apiUrlGetGroupByGradoGrupo}/?grado=${grado}&grupo=${grupo}`;
      return this.http.get<Grupo[]>(url).pipe(
        tap((grupos: Grupo[]) => {
          if (grupos.length > 0) {
            const grupoSeleccionado = grupos[0]; 
            // Asegúrate de actualizar el id_grupo cada vez que se obtengan los grupos
            localStorage.setItem('id_grupo', grupoSeleccionado.id_grupo.toString());
            console.log('ID del grupo guardado en localStorage:', grupoSeleccionado.id_grupo);
          }
        }),
        catchError((error) => {
          console.error('Error al obtener los grupos:', error);
          return throwError(() => new Error('No se pudieron obtener los grupos.'));
        })
      );
    } else {
      console.error('Grado o grupo no encontrados en localStorage');
      return throwError(() => new Error('Grado o grupo no encontrados en localStorage'));
    }
  }

  // Método para actualizar los valores en localStorage si es necesario
  updateLocalStorage(grado: string, grupo: string) {
    localStorage.setItem('grado', grado);
    localStorage.setItem('grupo', grupo);
    console.log('Grado y grupo actualizados en localStorage');
  }
}