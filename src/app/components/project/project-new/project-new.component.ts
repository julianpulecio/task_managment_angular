import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
})
export class ProjectNewComponent implements OnInit {

  @ViewChild('closebutton')closebutton:any;

  constructor(private projectService:ProjectService){}

  formdata:FormGroup = new FormGroup({ 
    title: new FormControl(),
    description: new FormControl(),
    color: new FormControl(),
  });

  title:any
  description:any
  color:any

  ngOnInit(): void {
  }

  onClickSubmit(data:any) {
    this.projectService.newProject({
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
