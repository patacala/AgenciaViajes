import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;
  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               private router: Router) {
    console.log('servicio usuario listo para usar');
    this.loadStorage();
    this.url = URL_SERVICES;
  }

  isLogged() {
    return (this.token.length > 5) ? true : false;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {

    // guardo el usuario en el localstorage
    if (recordar) {
      localStorage.setItem('username', usuario.email);
    } else {
      localStorage.removeItem('username');
    }

    const endpoint = this.url + '/login';
    return this.http.post(endpoint, usuario)
              .pipe(
                map( (resp: any) => {
                  if (resp.status) {
                    this.saveStorage(resp.message, resp.user);
                  }
                  return resp;
                })
              );
  }

  saveStorage(token: string, user: Usuario) {
    // localStorage.setItem('id', resp.id);
    localStorage.setItem('token', token);
    // limpiar el password
    user.password = '';
    localStorage.setItem('usuario', JSON.stringify(user));
    this.usuario = user;
    this.token = token;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }


}
