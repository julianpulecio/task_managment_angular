import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
})
export class YearComponent implements OnInit {

  tasks:Array<any> = []
  months:Array<number> = Array(12).fill(1).map((x, i) => i + 1)

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks:any)=>{
      this.tasks = tasks
    })
  }
}
