import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  url: string;
  token: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.url = URL_SERVICES;
    this.token = userService.token;
   }

  getcity() {
    const options = this.setHeader(this.token);
    return this.http.get(this.url + '/ciudades', options);
  }



  setHeader(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return httpOptions;
  }

}
