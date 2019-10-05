import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {

    this.getDataRoute().subscribe(data => {
      // setea el titulo del breadcrumbs
      this.titulo = data.titulo;
      // se setea el titulo de la pestaña del navegador
      this.title.setTitle(this.titulo);

      const metatag: MetaDefinition = {
        name: 'descripcion',
        content: this.titulo
      };

      this.meta.updateTag(metatag);




    });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evt => evt instanceof ActivationEnd),
      filter( (evt: ActivationEnd) => evt.snapshot.firstChild === null),
      map((evt: ActivationEnd ) => evt.snapshot.data)
    );
  }

}
