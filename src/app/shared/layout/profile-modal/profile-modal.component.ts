import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../Service/user.service';
import { LoginService } from '../../../auth/services/login.service';
import { ModalServiceProfile } from '../Service/ModalProfile.service';
import { AlertService } from '../../modals/services/alert.service';
import { LoaderService } from '../../modals/services/loader.service';

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
  

  constructor(
    private userService: UserService,
    private modalService: ModalServiceProfile,
    private loginService: LoginService,
    private alertService: AlertService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    console.log('Rol del usuario:', this.role);

    if (!this.role) {
      console.warn('No se encontró el rol en localStorage');
      return;
    }

    this.fetchUserData();
  }

  fetchUserData(): void {
    this.loaderService.show();
  
    if (this.role === 'docente') {
      this.loadDocenteData();
    } else if (this.role === 'alumno') {
      this.loadAlumnoData();
    } else if (this.role === 'director') {
      this.loadDirectorData();
    } else {
      console.warn('Rol no reconocido:', this.role);
      this.loaderService.hide(); 
    }
  }
  

  private loadDocenteData(): void {
    const idDocente = localStorage.getItem('id_docente');
    if (!idDocente) {
      console.error('ID de docente no encontrado en localStorage');
      this.isLoading = false;
      return;
    }

    this.userService.getDocente(idDocente).subscribe({
      next: (data) => {
        this.userData = data;
        this.loadUserImage(this.userData.usuario);
      },
      error: (err) => {
        console.error('Error al obtener los datos del docente:', err);
        this.isLoading = false;
      }
    });
  }

  private loadAlumnoData(): void {
    const matricula = localStorage.getItem('usuario');
    if (!matricula) {
      console.error('Matrícula del alumno no encontrada en localStorage');
      this.isLoading = false;
      return;
    }

    this.userService.getAlumno(matricula).subscribe({
      next: (data) => {
        this.userData = data;
        this.loadUserImage(matricula);
      },
      error: (err) => {
        console.error('Error al obtener los datos del alumno:', err);
        this.isLoading = false;
      }
    });
  }

  private loadDirectorData(): void {
    const idDirector = localStorage.getItem('id_director');
    if (!idDirector) {
      console.error('ID de director no encontrado en localStorage');
      this.isLoading = false;
      return;
    }

    const directorId = Number(idDirector);
    if (isNaN(directorId)) {
      console.error('El ID del director no es un número válido');
      this.isLoading = false;
      return;
    }

    this.userService.getDirector(directorId).subscribe({
      next: (data) => {
        this.userData = data;
        this.loadUserImage(this.userData.usuario);
      },
      error: (err) => {
        console.error('Error al obtener los datos del director:', err);
        this.isLoading = false;
      }
    });
  }

  private loadUserImage(usuario: string): void {
    this.userService.getImagenUsuario(usuario).subscribe({
      next: (imageData) => {
        if (imageData.length > 0) {
          const relativePath = imageData[0].file_path.split('/static/')[1];
          this.imagen = `${this.userService.apiBaseUrl}static/${relativePath}`;
          console.log('Imagen del usuario cargada:', this.imagen);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar la imagen del usuario:', err);
        this.isLoading = false;
      }
    });
  }
  

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.alertService.showWarning('No se seleccionó ningún archivo.', 'Advertencia');
      return;
    }

    this.alertService.showConfirmation('¿Estás seguro de que quieres cargar esta nueva imagen?', 'Confirmar carga').then((result) => {
      if (result.isConfirmed) {
        const usuarioId = this.role === 'alumno' ? this.userData.matricula : this.userData.usuario;
  
        this.loaderService.show(); 
        this.userService.uploadUserImage(usuarioId, file).subscribe({
          next: (response) => {
            this.alertService.showSuccess('Imagen cargada exitosamente.', '¡Éxito!');
            this.loadUserImage(usuarioId); 
          },
          error: (err) => {
            console.error('Error al cargar la imagen:', err);
            this.alertService.showError(err.status, 'Error al cargar la imagen');
          },
          complete: () => {
            this.loaderService.hide(); 
          }
        });
      }
    });
  }

  

  onDeleteImage(): void {
    this.alertService.showConfirmation('¿Estás seguro de que quieres eliminar la imagen?', 'Confirmar eliminación').then((result) => {
      if (result.isConfirmed) {
        const usuarioId = this.role === 'alumno' ? this.userData.matricula : this.userData.usuario;
        
        this.loaderService.show(); 
        this.userService.deleteUserImage(usuarioId).subscribe({
          next: (response) => {
            this.alertService.showSuccess('Imagen eliminada exitosamente.', '¡Éxito!');
            this.imagen = null; 
          },
          error: (err) => {
            console.error('Error al eliminar la imagen:', err);
            this.alertService.showError(err.status, 'Error al eliminar la imagen');
          },
          complete: () => {
            this.loaderService.hide(); 
          }
        });
      }
    });
  }
  
  

  closeModal(): void {
    this.modalService.closeModal('profile');
  }

  isModalOpen(id: string): boolean {
    return this.modalService.isModalOpen(id);
  }

  onLogout(): void {
    this.loginService.logout();
    this.closeModal();
  }
}
