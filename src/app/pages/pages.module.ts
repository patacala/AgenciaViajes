import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
// modulos
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { TipoHabitacionComponent } from './tipo-habitacion/tipo-habitacion.component';
// rutas
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        UsuariosComponent,
        HotelesComponent,
        HabitacionesComponent,
        TipoHabitacionComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        UsuariosComponent,
        HotelesComponent,
        HabitacionesComponent,
        TipoHabitacionComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        NgxSpinnerModule,
        CommonModule,
        PAGES_ROUTES
    ]
})

export class PagesModule {}

