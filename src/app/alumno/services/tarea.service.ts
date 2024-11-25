import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment';
@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl: string = `${environment.apiUrl}tareas`; // URL base de la API

  constructor(private http: HttpClient) {}

  createTarea(id_actividad: number, file: File): Observable<any> {
    const id_alumno = localStorage.getItem('usuario');  // Cargar id_alumno desde localStorage
    if (!id_alumno) {
      return throwError(() => new Error('No se encontró el id del alumno en el almacenamiento local.'));
    }

    const formData = new FormData();
    formData.append('id_actividad', id_actividad.toString());
    formData.append('id_alumno', id_alumno);
    if (file) {
      formData.append('file', file, file.name);
    }

    // Realizar la petición HTTP POST
    return this.http.post(this.apiUrl, formData).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error creando tarea:', error);
        return throwError(() => new Error('Error creando tarea. Por favor intente más tarde.'));
      })
    );
  }
}
