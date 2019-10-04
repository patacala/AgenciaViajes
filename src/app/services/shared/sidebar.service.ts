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
    }
  ];

  constructor() { }
}
