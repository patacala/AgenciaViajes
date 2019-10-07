import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  url: string;
  username: string;
  form = new FormGroup ({
    user: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    remember: new FormControl(false),
  });

  constructor(public router: Router,
              private userService: UserService) {

  }

  ngOnInit() {
    init_plugins();

    // aplico la opcion de recuerdame
    this.username = localStorage.getItem('username') || '';
    this.form.controls.user.setValue(this.username);
    if (this.username.length > 1) {
      this.form.controls.remember.setValue(true);
    }
  }

  ingresar() {
    // console.log(this.form.value);
    const usuario = new Usuario(null, null, this.form.value.user, this.form.value.password);
    if (this.form.valid) {
      this.userService.login(usuario, this.form.value.remember)
                            .subscribe(response => {
                              if (response.status) {
                                Swal.fire({
                                  type: 'success',
                                  title: 'Bienvenido',
                                  toast: true,
                                  timer: 2000,
                                  position: 'top-end',
                                  showConfirmButton: false,
                                }).then(() => {
                                  this.router.navigate(['/dashboard']);
                                });
                              } else {
                                Swal.fire({
                                  title: 'Oops!',
                                  text: 'Tu usuario o contraseña son incorrectos',
                                  type: 'warning',
                                  showConfirmButton: false,
                                  timer: 2000,

                                });
                                // swal('Datos incorrectos!', 'Usuario o contraseña incorrecta!', 'warning');
                              }

                            });
    }
    // this.router.navigate(['/dashboard']);
  }

}
