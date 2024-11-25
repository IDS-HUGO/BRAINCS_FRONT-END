import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UsuarioService } from '../Service/usuario.service';
import { UsuarioResponse,ImagenResponse } from '../Models/usuario.interface';
@Component({
  selector: 'app-view-usuario-modal',
  templateUrl: './view-usuario-modal.component.html',
  styleUrls: ['./view-usuario-modal.component.css']
})
export class ViewUsuarioModalComponent implements OnInit {
  @Input() userId!: number;
  @Output() closeModalEvent = new EventEmitter<void>();

  usuario: UsuarioResponse = {
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    correo_electronico: "",
    usuario: ""
  };
  imagen: string | undefined;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      this.usuarioService.getUsuario(usuario).subscribe(data => {
        this.usuario = data;
      });

      this.usuarioService.getImagenUsuario(usuario).subscribe(data => {
        if (data.length > 0) {
          const relativePath = data[0].file_path.split('/static/')[1];
          this.imagen = `${this.usuarioService.apiBaseUrl}/static/${relativePath}`;
        }
      });
    } else {
      console.error('Usuario no encontrado en localStorage');
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
