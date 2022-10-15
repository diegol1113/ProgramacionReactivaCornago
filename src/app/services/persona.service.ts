import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from './models/curso';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  personas: Persona[] = [{
    nombre: 'rodri',
    apellido: 'perez'
    
  },{
    nombre: 'juan',
    apellido: 'benedetto'
  },{
    nombre: 'lionel',
    apellido: 'mateoli'
  },{
    nombre: 'cosa',
    apellido: 'kramer'
  }];  

  personasObservable: Observable<Persona[]>

  constructor(  ) {
    this.personasObservable = new Observable<Persona[]>((suscriptor)=> {
      suscriptor.next(this.personas);
    })
  }


  obtenerPersonasPromise(): Promise<Persona[]>{
    return new Promise((resolve, reject) =>{
      if (this.personas.length >0) {
        resolve(this.personas);
        this.personas.push({
          nombre: 'cosa',
          apellido: 'sosa'
        })
        resolve(this.personas);
        console.log(this.personas)
      }else{
        reject({
          codigo: 0,
          mensaje: 'algo salio mal'
        })
      }
    });
  }
  

  obtenerPersonasObservable(){
    return this.personasObservable;
  }
  
  
}

