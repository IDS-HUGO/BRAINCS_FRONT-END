import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TemarioService } from '../../services/temario.service';
import { Temario } from '../../models/temario';
import { TemarioSelectedService } from '../../../shared/cards/services/temario-selected.service';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-view-temario',
  templateUrl: './view-temario.component.html',
  styleUrls: ['./view-temario.component.css']
})
export class ViewTemarioComponent implements OnInit {
  temarios: Temario[] = [];
  selectedTemario: any = null;
  isModalOpen = false;
  
  groupId: number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private temarioService: TemarioService,
    private modalService: ModalService,
    private temarioSelected: TemarioSelectedService
  ) {}
  

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.groupId) {
      this.loadTemarios();
    }
  }

  loadTemarios(): void {
    this.temarioService.getTemarios(this.groupId).subscribe((response) => {
      this.temarios = response;
      console.log('Temarios cargados:', this.temarios);
    });
  }  

  openTemarioInspectModal(temario: any) {
    if (temario) {
      this.temarioSelected.setSelectedTemario(temario);
      this.isModalOpen = true;
    } else {
      console.error('Temario no válido:', temario);
    }
  }  
  
  

  openTemarioModal(){
    this.modalService.openModal('temario')
  }

}
