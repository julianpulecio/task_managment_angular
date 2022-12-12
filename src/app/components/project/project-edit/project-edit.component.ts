import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
})
export class ProjectEditComponent implements OnInit {

  @Input('project')project:any
  @ViewChild('closebutton')closebutton:any;

  constructor(private projectService:ProjectService) { }

  formdata:FormGroup = new FormGroup({ 
    title: new FormControl(),
    description: new FormControl(),
    color: new FormControl(),
  });

  ngOnInit(): void {
  }

  onClickDelete(){
    this.projectService.deleteProject(this.project.id).subscribe({
      next: () => { this.projectService.updatedProjects() },
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
    this.projectService.editProject(this.project.id,{
      title: data.title,
      description: data.description,
      color: data.color,
    }).subscribe({
      next: () => { 
        this.projectService.updatedProjects(),
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
