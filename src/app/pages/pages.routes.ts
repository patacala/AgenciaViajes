import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { LoginGuardGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { TipoHabitacionComponent } from './tipo-habitacion/tipo-habitacion.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'}},
            {path: 'hoteles', component: HotelesComponent, data: {titulo: 'Hoteles'}},
            {path: 'habitaciones', component: HabitacionesComponent, data: {titulo: 'Habitaciones'}},
            {path: 'tipo-habitaciones', component: TipoHabitacionComponent, data: {titulo: 'Tipo Habitaciones'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
