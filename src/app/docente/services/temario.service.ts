import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TemarioService {

  private apiUrlGetTemarios = `${environment.apiUrl}temario/grupo/`;

  constructor(private http: HttpClient) { }

  getTemarios(idGrupo: number): Observable<any> {
    const url = `${this.apiUrlGetTemarios}${idGrupo}`;
    console.log('URL construida:', url);
    return this.http.get<any[]>(url);
  }
}