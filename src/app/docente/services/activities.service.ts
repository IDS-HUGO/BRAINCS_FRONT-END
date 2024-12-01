import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private readonly apiUrl = `${environment.apiUrl}actividad/`;

  constructor(private http: HttpClient) { }

  createActivity(idGrupo: number, tema: string, subtema: string, contenido: Blob | File): Observable<any> {
    const url = `${this.apiUrl}?id_grupo=${idGrupo}&tema=${tema}&subtema=${subtema}`;
    const formData = new FormData();
    formData.append('contenido', contenido, 'generated-content.pdf');
    return this.http.post(url, formData);
  }  

  getActivitiesByGroup(groupId: number): Observable<any> {
    const url = `${this.apiUrl}actividades/${groupId}`;
    return this.http.get(url);
  }

  getActivityById(id: number): Observable<any> {
    const url = `${this.apiUrl}actividad/${id}`;
    return this.http.get(url);
  }

  updateActivity(idGrupo: number, idActividad: number, tema: string, subtema: string, contenido: Blob | File): Observable<any> {
    const url = `${this.apiUrl}actividades/${idGrupo}/${idActividad}?tema=${encodeURIComponent(tema)}&subtema=${encodeURIComponent(subtema)}`;
    const formData = new FormData();
    formData.append('contenido', contenido, 'updated-content.pdf');
    return this.http.put(url, formData);
  }
  
  deleteActivity(idGrupo: number, idActividad: number): Observable<any> {
    const url = `${this.apiUrl}actividades/${idGrupo}/${idActividad}`;
    return this.http.delete(url);
  }
}