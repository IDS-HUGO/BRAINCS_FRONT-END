import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/director.interface';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'https://apibrainiacs.brainiacs.site/directores/directores/';

  constructor(private http: HttpClient) {}

  registerDirector(director: Director): Observable<any> {
    return this.http.post(this.apiUrl, director);
  }

  uploadUserImage(usuarioId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.apiUrl}imagen_usuario/upload-imagen/?usuario_id=${usuarioId}`;
    return this.http.post(url, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}
