import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
})
export class EmployeeNewComponent implements OnInit {

  
  @ViewChild('closebutton')closebutton:any;

  constructor(private employeeService:EmployeeService) { }

  formdata:FormGroup = new FormGroup({ 
    email: new FormControl(),
    name: new FormControl(),
    last_name: new FormControl(),
  });

  email:any
  name:any
  last_name:any

  ngOnInit(): void {
  }
  
  onClickSubmit(data:any) {
    this.employeeService.newEmployee({
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
