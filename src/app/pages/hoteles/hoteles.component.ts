import { Component, OnInit, TemplateRef } from '@angular/core';
import { HotelService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { CiudadesService } from '../../services/ciudades/ciudades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { config } from '../../../../node_modules/rxjs';
import { Usuario } from '../../models/usuario.model';


declare var $: any;
@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styles: []
})
export class HotelesComponent implements OnInit {


  hoteles: any = [];
  ciudades: any = [];
  ciudad: string = '';
  modalRef: BsModalRef;
  Usuario: string = '';

  forma = new FormGroup({
      ciudad_id: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      estrellas: new FormControl(1, Validators.required),
      estado: new FormControl('A', Validators.required),
      usuario_id: new FormControl('', Validators.required),
      _id: new FormControl('')
  });


  constructor(private hotelService: HotelService,
              private ciudadesService: CiudadesService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService) { }

  ngOnInit() {
    // $('.select2').select2();
    this.cargarHoteles();
    this.cargarCiudades();
    if (localStorage.getItem('usuario')) {
      this.forma.controls.usuario_id.setValue(JSON.parse(localStorage.getItem('usuario'))._id);
      this.Usuario = JSON.parse(localStorage.getItem('usuario'))._id;
    }
  }

  cargarHoteles() {
    this.spinner.show();
    this.hotelService.getHotels()
            .subscribe((response: any) => {
                if (response.status) {
                  this.hoteles = response.message;
                } else {
                  Swal.fire({
                    title: 'No hay hoteles registrados',
                    type: 'info',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    position: 'top-end'
                  });
                }
                this.spinner.hide();
            });
  }

  cargarHotelesCiudad() {
    const params = {
      ciudad_id: this.ciudad
    };
    this.spinner.show();
    this.hotelService.getHotelsByCriteria(params)
    .subscribe((response: any) => {
        if (response.status) {
          this.hoteles = response.message;
        } else {
          this.hoteles = [];
          Swal.fire({
            title: 'No hay Hoteles en esta ciudad',
            type: 'info',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'top-end'
          });
        }
        this.spinner.hide();
    });
  }

  cargarCiudades() {
    this.ciudadesService.getcity()
              .subscribe((response: any) => {
                if (response.status) {
                 this.ciudades = response.message;
                 console.log(this.ciudades);

                } else {
                  Swal.fire({
                    title: 'No hay ciudades registradas',
                    type: 'info',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    position: 'top-end'
                  });
                }
              });
  }


  desactivarHotel(hotels: any) {
    const hotel = hotels;
    hotel.estado = 'I';
    hotel.ciudad_id = hotel.ciudad_id._id;
    this.spinner.show();
    this.hotelService.updateHotel(hotel).subscribe((response: any) => {
      if (response.status) {
        Swal.fire({
          title: 'Muy Bien',
          text: 'Hotel desactivado con exito',
          type: 'success',
          showConfirmButton: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al actualizar un hotel',
          type: 'error',
          showConfirmButton: true,
          timer: 3000,
        });
      }

      this.spinner.hide();
      this.cargarHoteles();
    });
  }

  guardarHotel() {
    // this.hotelService.guarda
    if (this.forma.valid) {
      this.spinner.show();
      if (this.forma.value._id === '') {
        this.hotelService.saveHotel(this.forma.value)
                .subscribe((response: any) => {
                  this.spinner.hide();
                  if (response.status) {
                    Swal.fire({
                      title: 'Muy Bien',
                      text: 'Hotel creado con exito',
                      type: 'success',
                      showConfirmButton: true,
                      timer: 3000,
                    });
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: 'Hubo un error guardando los datos intente nuevamente',
                      type: 'error',
                      showConfirmButton: true,
                      timer: 2000,
                    });
                  }
                });
      } else {
        this.hotelService.updateHotel(this.forma.value)
                .subscribe((response: any) => {
                  this.spinner.hide();
                  if (response.status) {
                    Swal.fire({
                      title: 'Muy Bien',
                      text: 'Hotel actualizando con exito',
                      type: 'success',
                      showConfirmButton: true,
                      timer: 3000,
                    });
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: 'Hubo un error guardando los datos intente nuevamente',
                      type: 'error',
                      showConfirmButton: true,
                      timer: 2000,
                    });
                  }
                });
      }
      this.modalRef.hide();
      this.cargarHoteles();
    } else {
      Swal.fire({
        title: 'Revisa los Datos',
        text: 'Todos los campos son necesarios.',
        type: 'warning',
        showConfirmButton: true,
        timer: 2000,
      });
    }
  }

  llenarModal(hotel) {
    this.forma.controls.ciudad_id.setValue(hotel.ciudad_id._id);
    this.forma.controls.nombre.setValue(hotel.nombre);
    this.forma.controls.estrellas.setValue(hotel.estrellas);
    this.forma.controls.estado.setValue(hotel.estado);
    this.forma.controls.usuario_id.setValue(hotel.usuario_id);
    this.forma.controls._id.setValue(hotel._id);
  }

  vaciarFormulario() {
    this.forma.controls.ciudad_id.setValue('');
    this.forma.controls.nombre.setValue('');
    this.forma.controls.estrellas.setValue(1);
    this.forma.controls.estado.setValue('A');
    this.forma.controls.usuario_id.setValue(this.Usuario);
    this.forma.controls._id.setValue('');
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
