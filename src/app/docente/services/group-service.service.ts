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

  constructor(private http: HttpClient) {}

  private groupAddedSubject = new Subject<void>();
  groupAdded$ = this.groupAddedSubject.asObservable();

  private groupUpdatedSubject = new Subject<void>();
  groupUpdated$ = this.groupUpdatedSubject.asObservable();

  private apiUrlGetGroupById: string = `${environment.apiUrl}grupos/grupos/docente/`;
  private apiUrlAddGroup: string = `${environment.apiUrl}grupos/grupos`;

  addGroup(groupData: GroupData): Observable<GroupData> {
    return this.http.post<GroupData>(this.apiUrlAddGroup, groupData).pipe(
      tap(() => this.groupAddedSubject.next())
    );
  }

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

  getGroupById(groupId: number): Observable<GroupData> {
    const url = `${environment.apiUrl}grupos/grupos/${groupId}`;
    return this.http.get<GroupData>(url);
  }

  updateGroup(groupId: number, groupData: Partial<GroupData>): Observable<GroupData> {
    const url = `${environment.apiUrl}grupos/grupos/${groupId}`;
    return this.http.put<GroupData>(url, groupData).pipe(
      tap(() => this.groupUpdatedSubject.next())
    );
  }  

  deleteGroup(groupId: number, idDocente: number): Observable<any> {
    const url = `${environment.apiUrl}grupos/grupos/${groupId}`;
    const body = {
      asignatura: "",
      grado: 0,
      grupo: "",
      id_docente: idDocente
    };
    return this.http.delete(url, { body });
  }
  
  notifyGroupUpdated() {
    this.groupUpdatedSubject.next();
  }

}