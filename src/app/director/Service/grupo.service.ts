import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../Models/grupo';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private apiUrl = 'https://apibrainiacs.brainiacs.site/grupos/grupos/';

  constructor(private http: HttpClient) {}

  // Obtener todos los grupos y filtrarlos por el id del docente
  getGruposByDocente(idDocente: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl).pipe(
      map(grupos => grupos.filter(grupo => grupo.id_docente === idDocente))
    );
  }
}
