// tarea.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tema: string = '';
  private subtema: string = '';
  private groupId: number = 0;

  setTemaSubtema(tema: string, subtema: string, groupId: number) {
    this.tema = tema;
    this.subtema = subtema;
    this.groupId = groupId;
  }

  getTemaSubtema() {
    return { tema: this.tema, subtema: this.subtema, groupId: this.groupId };
  }
}