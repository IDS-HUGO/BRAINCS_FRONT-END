import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { GroupData } from '../models/group-data';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  private apiUrlGetGroupById: string = `${environment.apiUrl}grupos/grupos/docente/`;
  private apiUrlAddGroup: string = `${environment.apiUrl}grupos/grupos`;
  
  private groupAddedSubject = new Subject<void>();
  groupAdded$ = this.groupAddedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getGroups(idDocente: number): Observable<GroupData[]> {
    const body: GroupData = {
      id_grupo: 0,
      asignatura: '',
      grado: 0,
      grupo: '',
      id_docente: idDocente
    };

    return this.http.post<GroupData[]>(this.apiUrlGetGroupById, body);
  }

  addGroup(groupData: GroupData): Observable<GroupData> {
    return this.http.post<GroupData>(this.apiUrlAddGroup, groupData).pipe(
      tap(() => this.groupAddedSubject.next())
    );
  }
}