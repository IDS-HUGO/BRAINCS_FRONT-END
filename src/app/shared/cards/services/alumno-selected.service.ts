import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoSelectedService {

  constructor() { }


  private selectedAlumnoSource = new BehaviorSubject<any>(null);
  selectedAlumno$ = this.selectedAlumnoSource.asObservable();

  private selectedAlumnoIdSource = new BehaviorSubject<any>(null);
  selectedAlumnoId$ = this.selectedAlumnoIdSource.asObservable();

  setSelectedAlumno(alumno : any){
    this.selectedAlumnoSource.next(alumno);
  }

  setSelecteAlumnoId(id : number){
    this.selectedAlumnoIdSource.next(id);
  }

  clearSelectedAlumno(){
    this.selectedAlumnoSource.next(null);
    this.selectedAlumnoIdSource.next(null)
  }
}


  


