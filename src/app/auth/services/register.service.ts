import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/director.interface';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'https://apibrainiacs.brainiacs.site/directores/directores/';

  constructor(private http: HttpClient) {}

  registerDirector(director: Director): Observable<any> {
    return this.http.post(this.apiUrl, director);
  }
}
