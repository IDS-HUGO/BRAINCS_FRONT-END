import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TemarioSelectedService {

  private selectedTemarioSource = new BehaviorSubject<any>(null);
  selectedTemario$ = this.selectedTemarioSource.asObservable();

  private selectedTemarioIdSource = new BehaviorSubject<any>(null);
  selectedTemarioId$ = this.selectedTemarioIdSource.asObservable();

  setSelectedTemario(temario : any){
    this.selectedTemarioSource.next(temario);
  }

  setSelecteTemarioId(id : number){
    this.selectedTemarioIdSource.next(id);
  }

  clearSelectedTemario(){
    this.selectedTemarioSource.next(null);
    this.selectedTemarioIdSource.next(null)
  }
}
