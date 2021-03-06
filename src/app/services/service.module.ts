import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  HotelService,
  CiudadesService,
  HabitacionService,
  LoginGuardGuard
} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService,
              SidebarService,
              SharedService,
              UserService,
              HotelService,
              CiudadesService,
              HabitacionService,
              LoginGuardGuard
            ]
})
export class ServiceModule { }
