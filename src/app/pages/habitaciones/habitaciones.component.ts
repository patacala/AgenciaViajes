import { Component, OnInit, TemplateRef } from '@angular/core';
import { HabitacionService } from '../../services/service.index';
import { HotelService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styles: []
})
export class HabitacionesComponent implements OnInit {

  hoteles: any = [];
  habitaciones: any = [];
  tipoHabitaciones: any = [];
  ciudad: string = '';
  modalRef: BsModalRef;
  Usuario: string = '';


  forma = new FormGroup({
    hotel_id: new FormControl(null, Validators.required),
    tipohabitacion_id: new FormControl(null, Validators.required),
    ubicacion: new FormControl(1, Validators.required),
    estado: new FormControl('A', Validators.required),
    _id: new FormControl(''),
    usuario_id: new FormControl('', Validators.required),
    estado_reserva: new FormControl('', Validators.required),
    codigo_reserva: new FormControl('', Validators.required)
});

  constructor(private habitacionService: HabitacionService,
              private hotelService: HotelService,
              // private ciudadesService: CiudadesService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.cargarHabitaciones();
    this.cargarHoteles();
    this.cargarTipoHabitaciones();
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

  cargarTipoHabitaciones() {
    this.spinner.show();
    this.habitacionService.getTypeRooms()
            .subscribe((response: any) => {
                if (response.status) {
                  this.tipoHabitaciones = response.message;
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



  cargarHabitaciones() {
    this.spinner.show();
    this.habitacionService.getRooms()
            .subscribe((response: any) => {
                if (response.status) {
                  this.habitaciones = response.message;
                } else {
                  Swal.fire({
                    title: 'No hay habitaciones registrados',
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

  desactivarHabitacionl(habitaciones: any) {
    const habitacion = habitaciones;
    habitacion.estado = 'I';
    habitacion.hotel_id = habitacion.hotel_id._id;
    habitacion.tipohabitacion_id = habitacion.tipohabitacion_id._id;
    habitacion.usuario_id = habitacion.usuario_id._id;
    this.spinner.show();
    this.habitacionService.updateHabitacion(habitacion).subscribe((response: any) => {
      if (response.status) {
        Swal.fire({
          title: 'Muy Bien',
          text: 'Habitacion desactivada con exito',
          type: 'success',
          showConfirmButton: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al actualizar un Habitacion',
          type: 'error',
          showConfirmButton: true,
          timer: 3000,
        });
      }

      this.spinner.hide();
      this.cargarHabitaciones();
    });
  }

  guardarHotel() {
    console.log(this.forma.value);

    // this.hotelService.guarda
    if (this.forma.valid) {
      this.spinner.show();
      if (this.forma.value._id === '') {
        this.habitacionService.saveHabitacion(this.forma.value)
                .subscribe((response: any) => {
                  this.spinner.hide();
                  if (response.status) {
                    Swal.fire({
                      title: 'Muy Bien',
                      text: 'Habitacion creada con exito',
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
        this.habitacionService.updateHabitacion(this.forma.value)
                .subscribe((response: any) => {
                  this.spinner.hide();
                  if (response.status) {
                    Swal.fire({
                      title: 'Muy Bien',
                      text: 'Habitacion actualizanda con exito',
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
      this.cargarHabitaciones();
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

  llenarformulario(room) {
    this.forma.controls.hotel_id.setValue(room.hotel_id._id);
    this.forma.controls.tipohabitacion_id.setValue(room.tipohabitacion_id._id);
    this.forma.controls.ubicacion.setValue(room.ubicacion);
    this.forma.controls.estado.setValue(room.estado);
    this.forma.controls._id.setValue(room._id);
    this.forma.controls.usuario_id.setValue(room.usuario_id);
    this.forma.controls.estado_reserva.setValue('1');
    this.forma.controls.codigo_reserva.setValue('1');
  }

  vaciarFormulario() {
    this.forma.controls.hotel_id.setValue('');
    this.forma.controls.tipohabitacion_id.setValue('');
    this.forma.controls.ubicacion.setValue('');
    this.forma.controls.estado.setValue('A');
    this.forma.controls._id.setValue('');
    this.forma.controls.usuario_id.setValue(this.Usuario);
    this.forma.controls.estado_reserva.setValue('1');
    this.forma.controls.codigo_reserva.setValue('1');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
