import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../enviroment/enviroment';
import { GroupData } from '../models/group-data';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  private apiUrl = `${environment.apiUrl}grupos/grupos/`;

  constructor(private http: HttpClient) {}

  getGroups(): Observable<GroupData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<GroupData[]>(this.apiUrl, { headers });
  }
}
