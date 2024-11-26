import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemarioService } from '../../services/temario.service';
import { Temario } from '../../models/temario';
@Component({
  selector: 'app-view-temario',
  templateUrl: './view-temario.component.html',
  styleUrls: ['./view-temario.component.css']
})
export class ViewTemarioComponent implements OnInit {
  temarios: Temario[] = [];
  
  groupId: number = 0;
  grado: number = 0;
  grupo: string = '';
  
  // Datos para agregar o editar temarios
  temarioToEdit: any = null;  // Para editar un temario
  temarioToDelete: any = null; // Para eliminar un temario
  selectedFile: File | null = null; // Corregido: el archivo seleccionado puede ser nulo
  isAddModalOpen: boolean = false;  // Para controlar el modal de agregar

  constructor(
    private route: ActivatedRoute,
    private temarioService: TemarioService
  ) {}

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.grado = Number(this.route.snapshot.paramMap.get('grado'));
    this.grupo = String(this.route.snapshot.paramMap.get('grupo'));

    if (this.groupId) {
      this.loadTemarios();
    }
  }

  loadTemarios(): void {
    this.temarioService.getTemarios(this.groupId).subscribe((response) => {
      this.temarios = response;
    });
  }

  // Abrir el modal para agregar un nuevo temario
  openAddModal(): void {
    this.temarioToEdit = {}; // Inicializar un nuevo temario vacío
    this.selectedFile = null; // Reiniciar el archivo seleccionado
    this.isAddModalOpen = true;
  }

  // Cerrar el modal de agregar o editar
  closeAddModal(): void {
    this.isAddModalOpen = false;
    this.temarioToEdit = null;
    this.selectedFile = null;
  }

  // Método para manejar el archivo cargado
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Asignar el archivo seleccionado
  }

  // Guardar el temario nuevo o editado
  saveTemario(): void {
    if (this.temarioToEdit) {
      if (this.temarioToEdit.id) {
        // Editar temario existente
        this.temarioService.updateTemario(this.temarioToEdit, this.selectedFile).subscribe(() => {
          this.loadTemarios();
          this.closeAddModal();
        });
      } else {
        // Crear nuevo temario
        this.temarioService.addTemario(this.temarioToEdit).subscribe(() => {
          this.loadTemarios();
          this.closeAddModal();
        });
      }
    }
  }

  // Abrir el modal para editar un temario
  openEditModal(temario: any): void {
    this.temarioToEdit = { ...temario }; // Copiar los datos del temario a editar
    this.isAddModalOpen = true;  // Abrir el modal de editar
  }

  // Abrir el modal para eliminar un temario
  openDeleteModal(temario: any): void {
    this.temarioToDelete = temario;
  }

  // Eliminar un temario
  deleteTemario(): void {
    if (this.temarioToDelete) {
      this.temarioService.deleteTemario(this.temarioToDelete.id).subscribe(() => {
        this.loadTemarios();
        this.temarioToDelete = null; // Resetear el temario a eliminar
      });
    }
  }

  // Cerrar el modal de eliminar
  closeDeleteModal(): void {
    this.temarioToDelete = null;
  }
}
