import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { ModalService } from '../../shared/modals/services/modal.service';
import { DocenteService } from '../Service/docente.service';
import { Subscription } from 'rxjs';
import { Docente } from '../Models/docente.interface';
import { UsuarioService } from '../Service/usuario.service';

@Component({
  selector: 'app-home-director',
  templateUrl: './home-director.component.html',
  styleUrls: ['./home-director.component.css']
})
export class HomeDirectorComponent implements OnInit, OnDestroy {
  modalOpen: boolean = false;
  docentes: Docente[] = []; 
  private modalSubscription: Subscription | undefined;
  private docenteAddedSubscription: Subscription | undefined;
  showSchoolInfoModal = false;
  docenteImages: { [usuario: string]: string } = {};

  constructor(
    private modalService: ModalService,
    private docenteService: DocenteService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
    this.docenteAddedSubscription = this.docenteService.docenteAdded$.subscribe(() => {
      this.loadDocentes(); 
    });

    this.loadDocentes();
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    if (this.docenteAddedSubscription) {
      this.docenteAddedSubscription.unsubscribe();
    }
  }

  openSchoolInfoModal(): void {
    this.showSchoolInfoModal = true;
  }
  closeSchoolInfoModal(): void {
    this.showSchoolInfoModal = false;
  }

  loadDocentes() {
    this.docenteService.getAllDocentes().subscribe((response: any) => {
      this.docentes = response;
      this.docentes.forEach((docente) => {
        if (docente.usuario) {
          this.getUsuarioImage(docente.usuario);
        }
      });
    });
  }

  getUsuarioImage(usuario: string) {
    if (!usuario) {
      console.error('Usuario no disponible');
      return;
    }

    this.usuarioService.getImagenUsuario(usuario).subscribe(
      (response: any[]) => {
        if (response.length > 0 && response[0].file_path) {
          let relativePath = response[0].file_path.split('/static/')[1];
          if (relativePath) {
            this.docenteImages[usuario] = `https://apibrainiacs.brainiacs.site/static/${relativePath}`;
          } else {
            console.error('La ruta de la imagen no es válida');
            this.docenteImages[usuario] = '';
          }
        } else {
          console.log('No hay imagen para el usuario');
          this.docenteImages[usuario] = '';
        }
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
        this.docenteImages[usuario] = '';
      }
    );
  }
}
