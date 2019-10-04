import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modulos
import { PagesModule } from './pages/pages.module';

// rutas
import { APP_ROUTES } from './app.routes';
import { FormsModule } from '@angular/forms';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    FormsModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
