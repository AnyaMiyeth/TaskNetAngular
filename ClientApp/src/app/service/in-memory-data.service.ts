import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements  InMemoryDbService  {

  createDb() {
    const tasks = [
      {id: 11, title: 'Analisis de Requerimiento', description: 'Se requiere visualizar...', priority: true},
      {id: 12, title: 'Diseño de la arquitectura', description: 'Se requiere visualizar diseño...', priority: true}
    ];

    return {tasks};
  }
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }

}
