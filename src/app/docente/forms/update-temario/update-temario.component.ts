import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemarioService } from '../../services/temario.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TemarioSelectedService } from '../../../shared/cards/services/temario-selected.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';

@Component({
  selector: 'app-update-temario',
  templateUrl: './update-temario.component.html',
  styleUrls: ['./update-temario.component.css'],
})
export class UpdateTemarioComponent implements OnInit {
  groupId: number = 0;
  idTemario: number | null = null;
  temarioData: any = {};
  file: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private temarioService: TemarioService,
    private modalService: ModalService,
    private temarioSelectedService: TemarioSelectedService,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.temarioSelectedService.selectedTemarioId$.subscribe((id) => {
      if (id) {
        this.idTemario = id;
        this.loadTemarioData();
      } else {
        this.alertService.showError(400, 'No se recibió ningún ID de temario');
      }
    });
  }

  loadTemarioData() {
    if (this.idTemario) {
      this.loaderService.show();
      this.temarioService.getTemarioById(this.idTemario).subscribe({
        next: (temario) => {
          this.temarioData = temario;
          this.loaderService.hide();
        },
        error: (error) => {
          console.error('Error al cargar el temario:', error);
          this.loaderService.hide();
          this.alertService.showError(error.status || 500, 'Error al cargar el temario');
        },
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    } else {
      this.alertService.showWarning('No se seleccionó un archivo.');
    }
  }

  handleSubmit() {
    if (this.idTemario && this.temarioData) {
      if (!this.file) {
        this.alertService.showWarning('No se seleccionó un archivo para subir.');
        return;
      }

      const formData = new FormData();
      formData.append('contenido', this.file, this.file.name);

      this.loaderService.show();
      this.temarioService.updateTemario(formData, this.idTemario, this.groupId).subscribe({
        next: (response) => {
          this.alertService.showSuccess('Temario actualizado exitosamente.');
          console.log('Temario actualizado:', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar el temario:', error);
          this.alertService.showError(error.status || 500, 'Error al actualizar el temario');
        },
        complete: () => {
          this.loaderService.hide();
        },
      });
    } else {
      this.alertService.showWarning('Faltan datos necesarios para enviar el formulario.');
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
