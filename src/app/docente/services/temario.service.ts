import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TemarioService {

  private apiUrlGetTemarios = `${environment.apiUrl}temario/grupo/`;
  private apiUrlEditTemario = `${environment.apiUrl}temario/`; // Endpoint de edición
  private apiUrlDeleteTemario = `${environment.apiUrl}temario/`; // Endpoint de eliminación
  private apiUrlAddTemario = `${environment.apiUrl}temario/`;  // Endpoint de agregar

  constructor(private http: HttpClient) { }

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
