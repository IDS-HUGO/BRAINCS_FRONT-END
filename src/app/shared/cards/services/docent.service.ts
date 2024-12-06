import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocentService {

  private selectedDocenteSource = new BehaviorSubject<any>(null);
  selectedDocente$ = this.selectedDocenteSource.asObservable();

  private selectedDocenteIdSource = new BehaviorSubject<any>(null);
  selectedDocenteId$ = this.selectedDocenteIdSource.asObservable();

  setSelectedDocente(Docente: any) {
    this.selectedDocenteSource.next(Docente);
  }

  setSelectedDocenteId(id_docente: number) {
    this.selectedDocenteIdSource.next(id_docente);
  }

  clearSelectedDocente() {
    this.selectedDocenteSource.next(null);
    this.selectedDocenteIdSource.next(null);
  }
}
