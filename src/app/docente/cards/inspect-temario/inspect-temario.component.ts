import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { Subscription } from 'rxjs';
import { TemarioSelectedService } from '../../../shared/cards/services/temario-selected.service';

@Component({
  selector: 'app-inspect-temario',
  templateUrl: './inspect-temario.component.html',
  styleUrls: ['./inspect-temario.component.css']
})
export class InspectTemarioComponent implements OnInit {
  selectedTemario : any = null;
  private subscription : Subscription | undefined;
  pdfUrl: string = '';

  constructor(
    private temarioSelected : TemarioSelectedService,
    private modalService : ModalService
  ) {}

  ngOnInit() {
    this.subscription = this.temarioSelected.selectedTemario$.subscribe((temario) => {
      this.selectedTemario = temario;
      if (!temario || !temario.documento_pdf) {
        console.log("No se recibió un temario válido o el PDF no está disponible");
      }
    });
  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  verTemario(pdfUrl : string | undefined) : void {
    if(pdfUrl){
      window.open(pdfUrl,'_blank');
    }else{
      console.log('pdf no disponible')
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
