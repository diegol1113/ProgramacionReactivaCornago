import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PersonasService } from './services/persona.service';
import { Persona } from './services/models/curso';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  personas!: Persona[];
  personas$!: Observable<Persona[]>;
  suscripcion : any;
  promesa: any;

  constructor(
    private personaService: PersonasService
  ){
//caso1: obtencion de la informacion apartir de una Promise
    this.promesa = personaService.obtenerPersonasPromise()

//caso2: obtencion de la informacion apartir de un observable que aplica un OnDestroy.
    this.suscripcion = personaService.obtenerPersonasObservable()
    .subscribe({
      next: (personas: Persona[])=> {
        this.personas = personas;
      },
      error: (error) => {
        console.error(error)
      }
   })
//caso3: obtencion de informacion apartir de un observable que utiliza un pipe async desde el HTML en reemplazo del OnDestroy
    this.personas$ = personaService.obtenerPersonasObservable()
  }

  ngOnDestroy(){
//unsubscribe ligado al caso2.
    this.suscripcion.unscribe()
  }


//utilizamos of porque hay mas de un elemento de nombre 'cosa'
  ngOnInit(): void {
     of(this.personas).pipe(
       map((personas: Persona[]) =>
       personas.filter((persona: Persona) => persona.nombre === 'cosa'))
     ).subscribe((personas) => {
// resultado esperado: un array de length = 2.
       console.log('Filtro desde el of: ', personas);
     });
    }

}