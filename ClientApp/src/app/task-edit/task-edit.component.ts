import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDataService } from '../service/task-data.service';
import { Task } from '../models/task';
import { Location } from '@angular/common';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskDataService: TaskDataService ,
    private location: Location
  ) { this.task = new Task(); }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskDataService.searchTask(id)
      .subscribe( t => this.task = t);
  }

  update(): void {
    this.taskDataService.updateTask(this.task)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.taskDataService.deleteTask(this.task)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }


}
