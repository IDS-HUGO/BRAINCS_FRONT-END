import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl: string = `${environment.apiUrl}tareas/`; // Asegúrate de que el apiUrl esté configurado correctamente

  constructor(private http: HttpClient) {}

  subirTarea(tarea: Tarea, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('id_actividad', tarea.id_actividad.toString());
    formData.append('id_alumno', tarea.id_alumno);
    formData.append('tarea', tarea.tarea);
    if (file) {
      formData.append('file', file);
    }
  
    return this.http.post(this.apiUrl, formData);
  }
  
}
