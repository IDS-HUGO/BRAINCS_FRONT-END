import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { ModalService } from '../../shared/modals/services/modal.service';
import { DocenteService } from '../Service/docente.service';
import { Subscription } from 'rxjs';
import { Docente } from '../Models/docente.interface';

@Component({
  selector: 'app-home-director',
  templateUrl: './home-director.component.html',
  styleUrls: ['./home-director.component.css']
})
export class HomeDirectorComponent implements OnInit, OnDestroy {
  modalOpen: boolean = false;
  docentes: Docente[] = []; // Aquí se almacenarán los docentes (grupos)
  private modalSubscription: Subscription | undefined;
  private docenteAddedSubscription: Subscription | undefined;

  constructor(
    private modalService: ModalService,
    private docenteService: DocenteService
  ) {}

  ngOnInit() {
    // Suscripción al estado del modal
    this.modalSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });

    // Suscripción a los docentes
    this.docenteAddedSubscription = this.docenteService.docenteAdded$.subscribe(() => {
      this.loadDocentes();  // Recarga los docentes cuando uno se añade
    });

    // Cargar docentes al inicializar el componente
    this.loadDocentes();
  }

  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    if (this.docenteAddedSubscription) {
      this.docenteAddedSubscription.unsubscribe();
    }
  }

  

  // Método para cargar los docentes (grupos)
  loadDocentes() {
    this.docenteService.getAllDocentes().subscribe(docentes => {
      this.docentes = docentes;
    });
  }
}
