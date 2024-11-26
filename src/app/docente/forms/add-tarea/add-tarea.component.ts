import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TareaService } from '../../services/tarea.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent implements OnInit{
  modalOpen: boolean = false;
  tema: string = '';
  subtema: string = '';
  groupId : number = 0

  @Output() addTareaData = new EventEmitter<{ tema: string; subtema: string }>();

  constructor(
    private modalService: ModalService,
    private tareaService : TareaService,
    private route : ActivatedRoute
  ) {
    this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
  }

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onAddContent() {
    // Pasa `groupId` junto con `tema` y `subtema`
    this.tareaService.setTemaSubtema(this.tema, this.subtema, this.groupId);
    this.modalService.openModal('contenido');
    console.log('Tema, subtema y grupo enviados:', this.tema, this.subtema, this.groupId);
  }

}
