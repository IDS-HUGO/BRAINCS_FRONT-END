import { Component } from '@angular/core'; 
import { ModalService } from '../../../shared/modals/services/modal.service';
import { DocenteService } from '../../Service/docente.service';
import { DocentService } from '../../../shared/cards/services/docent.service';
import { ActivatedRoute } from '@angular/router';
import { Docente } from '../../Models/docente.interface';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';

@Component({
  selector: 'app-update-docente',
  templateUrl: './update-docente.component.html',
  styleUrl: './update-docente.component.css'
})
export class UpdateDocenteComponent {
  docenteId: number = 0;
  docente: Docente = {
    id_docente: 0,
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    correo_electronico: '',
    usuario: '',
    contrasena: ''
  }; 
  isLoading: boolean = false;


  constructor(
    private modalService: ModalService,
    private docenteService: DocenteService,
    private docentService: DocentService,
    public loaderService: LoaderService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.docenteId = Number(this.route.snapshot.paramMap.get('id_docente'));
    this.loaderService.show();
    this.docentService.selectedDocenteId$.subscribe(id_docente => {
      if (id_docente) {
        this.docenteId = id_docente;
        this.loadDocenteData();
      } else {
        this.loaderService.hide();
      }
    });
  }

  loadDocenteData() {
    this.loaderService.show();
    this.docenteService.getDocenteById(this.docenteId).subscribe(
      (docente) => {
        this.docente = docente; 
        this.loaderService.hide();
      },
      (error) => {
        console.error('Error al cargar los datos del docente:', error);
        this.alertService.showError(error.status);
        this.loaderService.hide();
      }
    );
  }

  onSubmit() {
    if (this.docente.nombre && this.docente.apellido_p && this.docente.apellido_m) {
      const updatedDocente = {
        nombre: this.docente.nombre,
        apellido_p: this.docente.apellido_p,
        apellido_m: this.docente.apellido_m,
        correo_electronico: this.docente.correo_electronico,
        usuario: this.docente.usuario,
        contrasena: this.docente.contrasena
      };

      this.loaderService.show();
      this.docenteService.updateDocente(updatedDocente, this.docenteId).subscribe(
        (response) => {
          console.log('Docente actualizado exitosamente:', response);
          this.alertService.showSuccess('El docente ha sido actualizado correctamente.');
          this.closeModal();
          this.loaderService.hide();
        },
        (error) => {
          console.error('Error al actualizar el docente:', error);
          this.alertService.showError(error.status, 'Error al actualizar');
          this.loaderService.hide();
        }
      );
    } else {
      this.alertService.showWarning('Por favor, completa todos los campos obligatorios.', 'Campos incompletos');
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.docentService.clearSelectedDocente();
  }
}
