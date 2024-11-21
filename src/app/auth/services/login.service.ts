import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../enviroment/enviroment';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}usuarios/usuarios/login`;

  constructor(private http: HttpClient) {}

  login(usuario: string, contrasena: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { usuario, contrasena };

    return this.http.post<LoginResponse>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        localStorage.setItem('role', response.role);
        return response;
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        throw error;
      })
    );
  }
}