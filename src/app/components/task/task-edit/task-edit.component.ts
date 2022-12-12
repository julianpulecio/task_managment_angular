import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
})
export class TaskEditComponent implements OnInit {

  @Input('task')task:any
  @ViewChild('closebutton')closebutton:any;

  all_employees_List:any = [];
  employees:any = []
  dropdown_employees_settings:IDropdownSettings = {};

  formdata:FormGroup = new FormGroup({ 
    title: new FormControl(),
    employees: new FormControl(),
    project: new FormControl(),
    description: new FormControl(),
    start_date: new FormControl(),
    end_date: new FormControl()
  }); 

  constructor(
    private employeeService:EmployeeService,
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
    this.employeeService.currentEmployees.subscribe(
      (all_employees:any) => this.all_employees_List = all_employees
    )
  }

  onClickDelete(){
    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => { this.taskService.updatedTasks() },
      error: (error) => {
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

  onClickSubmit(data:any) {
    console.log(this.task)
    let employees:Array<any> = []
    data.employees.forEach((employee:any) => {
       employees.push(employee.id) 
    });
    this.taskService.editTask(this.task.id,{
      employees: employees,
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
    }).subscribe({
      next: () => { 
        this.taskService.updatedTasks(),
        this.closebutton.nativeElement.click(); 
      },
      error: (error) => {
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
