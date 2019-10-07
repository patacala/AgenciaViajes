import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { CiudadesService } from '../../services/ciudades/ciudades.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(private hotelService: HotelService,
              private ciudadesService: CiudadesService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    $('.select2').select2();
    this.cargarHoteles();
    this.cargarCiudades();
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

}
