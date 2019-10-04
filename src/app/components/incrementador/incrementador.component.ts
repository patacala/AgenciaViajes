import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {


  @ViewChild( 'txtProgress', {static: false}) txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'leyenda';
  @Input() progreso: number = 50;



  @Output() cambioValor = new EventEmitter();

  constructor() {
   }

  ngOnInit() {
  }

  onChanges(valor: number) {

    if (valor >= 100 ) {
      this.progreso = 100;
    } else if (valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }


  cambiarValor(valor) {
    this.progreso = this.progreso + valor;
    if (this.progreso >= 100) {
      this.progreso = 100;
    }
    if (this.progreso <= 0) {
      this.progreso = 0;
    }

    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

}
