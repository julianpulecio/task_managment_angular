import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task_manager_angular';
  tasks:Array<any> = []
  projects:Array<any> = []
  employees:Array<any> = []

  constructor(private taskService:TaskService, private projectService:ProjectService, private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.taskService.currentTasks.subscribe((tasks:any)=>{
      this.tasks = tasks
    })
    this.projectService.currentProjects.subscribe((projects:any)=>{
      this.projects = projects
    })
    this.employeeService.currentEmployees.subscribe((employees:any)=>{
      this.employees = employees
    })
  }
}
