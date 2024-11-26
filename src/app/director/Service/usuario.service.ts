import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse,ImagenResponse } from '../Models/usuario.interface';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public apiBaseUrl = 'https://apibrainiacs.brainiacs.site';

  constructor(private http: HttpClient) {}

  getUsuario(usuarioId: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiBaseUrl}/directores/directores/2`);
  }

  getImagenUsuario(usuarioId: string): Observable<ImagenResponse[]> {
    return this.http.get<ImagenResponse[]>(`${this.apiBaseUrl}/imagen_usuario/imagenes/${usuarioId}`);
  }
}
