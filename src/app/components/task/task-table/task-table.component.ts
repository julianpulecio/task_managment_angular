import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
})
export class TaskTableComponent implements OnInit {

  tasks:Array<any> = []

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.currentTasks.subscribe((tasks:any)=>{
      this.tasks = tasks
    })
  }

}
