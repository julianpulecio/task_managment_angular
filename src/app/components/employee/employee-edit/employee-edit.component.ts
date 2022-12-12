import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
})
export class EmployeeEditComponent implements OnInit {

  @Input('employee')employee:any
  @ViewChild('closebutton')closebutton:any;

  constructor(private employeeService:EmployeeService) { }

  formdata:FormGroup = new FormGroup({ 
    email: new FormControl(),
    name: new FormControl(),
    last_name: new FormControl(),
  });

  ngOnInit(): void {
  }

  onClickDelete(){
    this.employeeService.deleteEmployee(this.employee.id).subscribe({
      next: () => { this.employeeService.updatedEmployees() },
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
    this.employeeService.editEmployee(this.employee.id,{
      email: data.email,
      name: data.name,
      last_name: data.last_name,
    }).subscribe({
      next: () => { 
        this.employeeService.updatedEmployees() ,
        this.closebutton.nativeElement.click(); 
      },
      error: (error) => {
        console.log(error)
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
