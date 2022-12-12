import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
})
export class EmployeeTableComponent implements OnInit {

  employees:Array<any> = []

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.currentEmployees.subscribe((employees)=>{
      this.employees = employees
    })
    this.employeeService.updatedEmployees()    
  }

}
