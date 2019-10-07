import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  url: string;
  token: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.url = URL_SERVICES;
    this.token = userService.token;
  }

  getRooms() {
    const options = this.setHeader(this.token);
    return this.http.get(this.url + '/habitacion', options);
  }

  getTypeRooms() {
    const options = this.setHeader(this.token);
    return this.http.get(this.url + '/tipo-habitacion', options);
  }

  updateHabitacion(params: any) {
    const options: any = this.setHeader(this.token);
    return this.http.put(this.url + '/habitacion', params, options);
  }

  saveHabitacion(params: any) {
    if (params._id === '') {
      delete params._id;
    }
    const options: any = this.setHeader(this.token);
    return this.http.post(this.url + '/habitacion', params, options);
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
