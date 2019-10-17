import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../service/task-data.service';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})

export class TaskAddComponent implements OnInit {
  task: Task;
  tasks:Task[];
  constructor(private taskDataService: TaskDataService) { }
  ngOnInit() {
    this.task = new Task();
  }

  add(): void {
    if (!this.task) { return; }
    this.taskDataService.addTask(this.task)
      .subscribe( task  => {
          alert('Se agrego una nueva tarea =>'+task.id);
             });
  }

/*   delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskDataService.deleteTask(task).subscribe();
  } */

}
