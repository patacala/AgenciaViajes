import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      Titulo: 'Principal',
      Icono:  'mdi mdi-gauge',
      Submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
      ]
    },
    {
      Titulo: 'Mantenimientos',
      Icono: 'mdi mdi-folder-lock-open',
      Submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Hoteles', url: '/hoteles'},
        {titulo: 'Habitaciones', url: '/habitaciones'}
      ]
    }
  ];

  constructor() { }
}
