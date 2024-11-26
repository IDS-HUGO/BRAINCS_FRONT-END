import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../Service/user.service';
import { ModalService } from '../Service/Modal.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  @Input() role: string | null = null;
  userData: any = null;
  isLoading: boolean = false;
  imagen: string | null = null;

  constructor(private userService: UserService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');  
    this.fetchUserData();  
    
  }

  fetchUserData(): void {
    if (!this.role) {
      console.warn('No se encontró el rol en localStorage');
      this.isLoading = false;
      return;
    }


    this.isLoading = true;

    if (this.role === 'docente') {
      const idDocente = localStorage.getItem('id_docente');
      if (idDocente) {
        this.userService.getDocente(idDocente).subscribe({
          next: (data) => {
            console.log('Datos del docente:', data); 
            this.userData = data;
            // Obtener la imagen del docente
            this.userService.getImagenUsuario(idDocente).subscribe({
              next: (imageData) => {
                if (imageData.length > 0) {
                  const relativePath = imageData[0].file_path.split('/static/')[1];
                  this.imagen = `${this.userService.apiBaseUrl}/static/${relativePath}`;
                  console.log('Ruta de la imagen del docente:', this.imagen);  // Imprimir la ruta de la imagen en consola
                }
              },
              error: (err) => {
                console.error('Error fetching docente image:', err);
              }
            });
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching docente data:', err);
            this.isLoading = false;
          }
        });
      }
    } else if (this.role === 'alumno') {
      const matricula = localStorage.getItem('usuario');
      if (matricula) {
        this.userService.getAlumno(matricula).subscribe({
          next: (data) => {
            console.log('Datos del alumno:', data); 
            this.userData = data;
            // Obtener la imagen del alumno
            this.userService.getImagenUsuario(matricula).subscribe({
              next: (imageData) => {
                if (imageData.length > 0) {
                  const relativePath = imageData[0].file_path.split('/static/')[1];
                  this.imagen = `${this.userService.apiBaseUrl}/static/${relativePath}`;
                  console.log('Ruta de la imagen del alumno:', this.imagen);  // Imprimir la ruta de la imagen en consola
                }
              },
              error: (err) => {
                console.error('Error fetching alumno image:', err);
              }
            });
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching alumno data:', err); 
            this.isLoading = false;
          }
        });
      }
    } else {
      console.warn('No se proporcionó un rol válido');
      this.isLoading = false;
    }
  }

  closeModal(): void {
    this.modalService.closeModal('profile'); 
  }

  isModalOpen(id: string): boolean {
    return this.modalService.isModalOpen(id);
  }
}
