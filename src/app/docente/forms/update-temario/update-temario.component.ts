import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemarioService } from '../../services/temario.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TemarioSelectedService } from '../../../shared/cards/services/temario-selected.service';

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
    private temarioSelectedService : TemarioSelectedService
  ) {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.temarioSelectedService.selectedTemarioId$.subscribe((id) => {
      if (id) {
        this.idTemario = id;
        this.loadTemarioData();
      } else {
        console.error('No se recibió ningún ID de temario');
      }
    });
  }
  

  loadTemarioData() {
    if (this.idTemario) {
      this.temarioService.getTemarioById(this.idTemario).subscribe(
        (temario) => {
          this.temarioData = temario;
        },
        (error) => {
          console.error('Error al cargar el temario:', error);
        }
      );
    }
  }  

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    } else {
      console.error('No se seleccionó un archivo.');
    }
  }

  handleSubmit() {
    if (this.idTemario && this.temarioData) {
      if (!this.file) {
        console.error('No se seleccionó un archivo.');
        return;
      }
  
      const formData = new FormData();
      formData.append('contenido', this.file, this.file.name);

      this.temarioService.updateTemario(formData, this.idTemario, this.groupId).subscribe(
        (response) => {
          console.log('Temario actualizado exitosamente:', response);
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el temario:', error);
        }
      );
    } else {
      console.error('Faltan datos necesarios para enviar el formulario.');
    }
  }
  

  closeModal() {
    this.modalService.closeModal();
  }
}