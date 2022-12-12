import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
})
export class ProjectTableComponent implements OnInit {

  projects:Array<any> = []

  constructor(private projectsService:ProjectService) { }

  ngOnInit(): void {
    this.projectsService.updatedProjects()
    this.projectsService.currentProjects.subscribe((projects)=>{
      this.projects = projects
    })
  }

}
