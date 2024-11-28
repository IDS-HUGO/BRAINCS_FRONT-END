import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../enviroment/enviroment';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private apiUrl = `${environment.apiUrl}usuarios/usuarios/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, contrasena: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { usuario, contrasena };

    return this.http.post<LoginResponse>(this.apiUrl, body, { headers }).pipe(
      map((response) => {
        localStorage.setItem('role', response.rol);

        if (response.rol === 'docente') {
          localStorage.setItem('id_docente', response.id_docente.toString());
        } else if (response.rol === 'alumno') {
          localStorage.setItem('usuario', response.usuario);
          localStorage.setItem('grado', response.grado.toString());
          localStorage.setItem('grupo', response.grupo);
        } else if (response.rol === 'director') {
          localStorage.setItem('usuario', response.usuario);
        }

        return response;
      }),
      catchError((error) => {
        console.error('Error en la autenticación:', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('id_docente');
    localStorage.removeItem('usuario');
    localStorage.removeItem('grado');
    localStorage.removeItem('grupo');

    this.router.navigate(['/login']);

  }
}
