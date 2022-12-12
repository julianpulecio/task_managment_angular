import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectSource = new BehaviorSubject<Array<any>>([])
  currentProjects = this.projectSource.asObservable()


  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any>(`${config.api}/projects/`)
  }

  editProject(project_id:number,project:any): Observable<any> {
    return this.http.put<any>(`${config.api}/projects/${project_id}/`, project)
  }

  deleteProject(project_id:number): Observable<any> {
    return this.http.delete<any>(`${config.api}/projects/${project_id}/`)
  }

  newProject(project:any): Observable<any> {
    return this.http.post<any>(`${config.api}/projects/`, project)
  }

  updatedProjects(){
    this.http.get(`${config.api}/projects/`).subscribe((data:any)=>{
      this.projectSource.next(data)
    })
  }
}
