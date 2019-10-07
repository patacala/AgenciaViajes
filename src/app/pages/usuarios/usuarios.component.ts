import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  busqueda: string = '';
  arrayUsuarios: any = [];
  constructor(private spinner: NgxSpinnerService,
              private userService: UserService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.spinner.show();
    this.userService.getUsers().subscribe((resp: any) => {
      if (resp.status) {
        this.arrayUsuarios = resp.message;
      } else {
          Swal.fire({
            title: 'No hay usuarios registrados',
            type: 'warning',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'top-end'
          });
      }
      this.spinner.hide();
    });
  }

}
