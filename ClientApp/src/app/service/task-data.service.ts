import { Injectable, Inject } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private taskUrl = this.baseUrl + 'api/task';  // URL to web api
  constructor( private http: HttpClient, @Inject('BASE_URL') private baseUrl: string ) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task,  this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`Se registro la informacion con el id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
      );
  }

  /* GET heroes whose name contains search term */
searchTask(id: number): Observable<Task> {
  if (!id) {
    // if not search term, return empty hero array.
    return of();
  }
  return this.http.get<Task>(`${this.taskUrl}/${id}`).pipe(
    tap(_ => this.log(`Se encontro la tarea ${id}`)),
    catchError(this.handleError<Task>(`searchTask id=${id}`))
  );
}


  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl).pipe(
      tap(tasks => {
        return this.log('Consulta de Tareas');
      }),
      catchError(this.handleError<Task[]>('getTask', [])));
  }

/** DELETE: delete the Task from the server */
deleteTask(task: Task | number): Observable<Task> {
  const id = typeof task === 'number' ? task : task.id;
  const url = `${this.taskUrl}/${id}`;

  return this.http.delete<Task>(url, this.httpOptions).pipe(
    tap(_ => this.log(`Se eliminó la tarea con id=${id}`)),
    catchError(this.handleError<Task>('deleteTask'))
  );
}

/** PUT: update the hero on the server */
updateTask(task: Task| number): Observable<any> {
  const id = typeof task === 'number' ? task : task.id;
  const url = `${this.taskUrl}/${id}`;
  return this.http.put(url, task, this.httpOptions).pipe(
    tap(_ => this.log(`Se actualizo la tarea con id=${id}`)),
    catchError(this.handleError<any>('updateTask'))
  );
}

  private log(message: string) {
   // this.messageService.add(`taskService: ${message}`);
   alert(`taskService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
      this.log(`${operation} Fallo: ${error.message}`);
        // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
