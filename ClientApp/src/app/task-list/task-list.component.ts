import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskDataService } from '../service/task-data.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  constructor(private taskDataService: TaskDataService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.taskDataService.getTask().subscribe(tasks => {
      return this.tasks = tasks;
    });
    }

}
