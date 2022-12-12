import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private employeeSource = new BehaviorSubject<Array<any>>([])
  currentEmployees = this.employeeSource.asObservable()

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get<any>(`${config.api}/employees/`)
  }

  editEmployee(employee_id:number,employee:any): Observable<any> {
    return this.http.put<any>(`${config.api}/employees/${employee_id}/`, employee)
  }

  deleteEmployee(employee_id:number): Observable<any> {
    return this.http.delete<any>(`${config.api}/employees/${employee_id}/`)
  }

  newEmployee(employee:any): Observable<any> {
    return this.http.post<any>(`${config.api}/employees/`, employee)
  }

  updatedEmployees(){
    this.http.get(`${config.api}/employees/`).subscribe((data:any)=>{
      this.employeeSource.next(data)
    })
  }
}
