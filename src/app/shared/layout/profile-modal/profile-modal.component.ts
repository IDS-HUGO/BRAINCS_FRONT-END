import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../Service/user.service';
import { LoginService } from '../../../auth/services/login.service';
import { ModalServiceProfile } from '../Service/ModalProfile.service';

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
    private loginService: LoginService
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
    this.isLoading = true;
  
    if (this.role === 'docente') {
      this.loadDocenteData();
    } else if (this.role === 'alumno') {
      this.loadAlumnoData();
    } else if (this.role === 'director') {
      this.loadDirectorData();
    } else {
      console.warn('Rol no reconocido:', this.role);
      this.isLoading = false;
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
    const idDirector = localStorage.getItem('usuario');
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
