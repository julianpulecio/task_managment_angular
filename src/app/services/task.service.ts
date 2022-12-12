import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSource = new BehaviorSubject<Array<any>>([])
  currentTasks = this.tasksSource.asObservable()

  constructor(private http: HttpClient){}

  getTasks() {
    return this.http.get(`${config.api}/tasks/`)
  }

  updatedTasks(){
    this.http.get(`${config.api}/tasks/`).subscribe((data:any)=>{
      this.tasksSource.next(data)
    })
  }

  editTask(task_id:number, task:any){
    return this.http.patch(`${config.api}/tasks/${task_id}/`, task)
  }

  createTask(task:any){
    return this.http.post(`${config.api}/tasks/`,task)
  }

  deleteTask(task_id:number){
    return this.http.delete(`${config.api}/tasks/${task_id}/`)
  }

  getTask(task_id:number){
    return this.http.get(`${config.api}/tasks/${task_id}/`)
  }
}
