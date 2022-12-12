import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
})
export class TaskNewComponent implements OnInit {

  @ViewChild('closebutton')closebutton:any;

  all_employees_List:any = [];
  employees:any = []
  dropdown_employees_settings:IDropdownSettings = {};

  all_projects_List:any = [];
  selected_project:any = []
  dropdown_project_settings:IDropdownSettings = {};

  description:any
  title:any
  start_date:any
  end_date:any

  formdata:FormGroup = new FormGroup({ 
    title: new FormControl(),
    employees: new FormControl(),
    selected_project: new FormControl(),
    description: new FormControl(),
    start_date: new FormControl(),
    end_date: new FormControl()
  }); 

  constructor(
    private employeeService:EmployeeService,
    private projectService:ProjectService,
    private taskService:TaskService
    ){}

  ngOnInit() {
    
    this.dropdown_employees_settings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdown_project_settings = {
      singleSelection: true,
      idField: 'id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.employeeService.currentEmployees.subscribe(
      (all_employees:any) => this.all_employees_List = all_employees
    )
    this.projectService.currentProjects.subscribe(
      (all_projects:any) => this.all_projects_List = all_projects
    )
    console.log(this.all_projects_List)
  }

  onClickSubmit(data:any) {
    let employees:Array<any> = []
    data.employees.forEach((employee:any) => {
       employees.push(employee.id) 
    });
    this.taskService.createTask({
      employees: employees,
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      project: data.selected_project
    }).subscribe({
      next: () => {         
        this.taskService.updatedTasks(),
        this.closebutton.nativeElement.click();
        this.formdata.reset();
      },
      error: (error:any) => {
        const validation_errors = error.error
        Object.keys(validation_errors).forEach(prop=>{
          const formControl = this.formdata.get(prop)
          if(formControl){
            formControl.setErrors(validation_errors[prop])
          }
        })
      }
    }) 
  }
}
